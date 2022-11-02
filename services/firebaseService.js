import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const userRef = db.collection("users");
const favRef = db.collection("favorites");
const bmRef = db.collection("bookmarks");
const placeRef = db.collection("places");
const activeRef = db.collection("activities");
const activeCountRef = db.collection("activityCount");

export const onLogin = async (userMail, userPass) => {
  const userRegisteredData = await firebase
    .auth()
    .signInWithEmailAndPassword(userMail, userPass)
    .then((userCredential) => {
      const userData = {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        name: userCredential.user.displayName,
      };
      return userData;
    })
    .catch((error) => {
      // ログインに失敗したときの処理
      console.error("ログインエラー", error);
    });
  return userRegisteredData;
};

export const onSignUp = async (userMail, userPass, userName) => {
  const userRegisterData = await firebase
    .auth()
    .createUserWithEmailAndPassword(userMail, userPass)
    .then(async (result) => {
      // 登録に成功したときの処理
      console.log("登録しました");
      // ユーザ名の保存
      await result.user.updateProfile({
        displayName: userName,
      });
      const currentUser = firebase.auth().currentUser;
      const userData = {
        id: currentUser.uid,
        email: currentUser.email,
        name: currentUser.displayName,
      };
      return userData;
    })
    .catch((error) => {
      // 登録に失敗したときの処理
      console.error("登録エラー", error);
    });
  console.log(userRegisterData);
  return userRegisterData;
};

export const registerUserInformation = (userData) => {
  userRef.doc(userData.id).set({
    uid: userData.id,
    email: userData.email,
    name: userData.name,
    created_at: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const getUserServePlaceData = async (userId, action) => {
  const assignRef = action === "favorite" ? favRef : bmRef;
  const placeIdData = await assignRef
    .where("user_id", "==", userId)
    .get()
    .then((placeSnapShot) =>
      placeSnapShot.docs.map((doc) => doc.get("place_id"))
    );
  return placeIdData;
};

export const registerPlace = async (place, action) => {
  await placeRef.doc(place.id).set({
    id: place.id,
    name: place.name,
    address: place.address,
    access: place.access,
    average: place.average,
    catchcopy: place.catchcopy,
    open: place.open,
    photo: place.photo,
    url: place.url,
    favorite_count: action === "favorite" ? 1 : 0,
    bookmark_count: action === "favorite" ? 0 : 1,
    created_at: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const registerUserPlace = async (placeId, userId, action) => {
  const assignRef = action === "favorite" ? favRef : bmRef;
  await assignRef.doc().set({
    user_id: userId,
    place_id: placeId,
    created_at: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const registerActivity = async (
  placeId,
  userId,
  userName,
  actionName
) => {
  const batch = db.batch();
  // activitiesに登録
  const activeDocRef = await activeRef.doc();
  batch.set(activeDocRef, {
    user_id: userId,
    username: userName,
    place_id: placeId,
    action: actionName,
    created_at: firebase.firestore.FieldValue.serverTimestamp(),
  });
  // activityCountを+1して更新
  const activeCountDocRef = await activeCountRef.doc("count");
  batch.update(activeCountDocRef, {
    activityCount: firebase.firestore.FieldValue.increment(1),
  });
  await batch.commit();
};

export const deleteUserAction = async (placeId, userId, action) => {
  const batch = db.batch();
  const assignRef = action === "favorite" ? favRef : bmRef;
  // favorites or bookmarks内のdocument削除
  const querySnapshot = await assignRef
    .where("user_id", "==", userId)
    .where("place_id", "==", placeId)
    .get();
  batch.delete(querySnapshot.docs[0].ref);
  // placeのfavorite_count or bookmark_countを-1する
  const assignKey = action === "favorite" ? "favorite_count" : "bookmark_count";
  const placeDocRef = await placeRef.doc(placeId);
  batch.update(placeDocRef, {
    [assignKey]: firebase.firestore.FieldValue.increment(-1),
  });
  // activityを削除
  const activeQuerySnapshot = await activeRef
    .where("user_id", "==", userId)
    .where("place_id", "==", placeId)
    .where("action", "==", action)
    .get();
  batch.delete(activeQuerySnapshot.docs[0].ref);
  console.log("Cancel activity of favorite!");
  // activityCountを-1して更新
  const activeCountDocRef = await activeCountRef.doc("count");
  batch.update(activeCountDocRef, {
    activityCount: firebase.firestore.FieldValue.increment(-1),
  });
  await batch.commit();
};

export const getRankingTop = async (action) => {
  const assignKey = action === "favorite" ? "favorite_count" : "bookmark_count";
  const rankingData = await placeRef
    .orderBy(assignKey, "desc")
    .orderBy("created_at", "desc")
    .limit(7)
    .get()
    .then((rankingSnapShot) => {
      rankingSnapShot.docs.map((doc) => doc.get());
      console.log(rankingSnapShot.docs);
    });
  return rankingData;
};

export const registerUserAction = async (place, userId, userName, action) => {
  placeRef
    .doc(place.id)
    .get()
    .then(async (placeDoc) => {
      if (placeDoc.exists) {
        const assignKey =
          action === "favorite" ? "favorite_count" : "bookmark_count";
        await placeRef.doc(place.id).update({
          [assignKey]: firebase.firestore.FieldValue.increment(1),
        });
      } else {
        // お店の情報が登録されていなかったら、登録
        await registerPlace(place, action);
      }
      // ユーザIDとお店のIDをfavoritesに登録
      await registerUserPlace(place.id, userId, action);
      // Activityの登録
      await registerActivity(place.id, userId, userName, action);
    });
};
