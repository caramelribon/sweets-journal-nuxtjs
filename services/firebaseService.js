import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const userRef = db.collection("users");
const favRef = db.collection("favorites");
const bmRef = db.collection("bookmarks");
const placeRef = db.collection("places");
const activeRef = db.collection("activities");
const activeCountRef = db.collection("activityCount");

const onLogin = async (userMail, userPass) => {
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

const onSignUp = async (userMail, userPass, userName) => {
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
  return userRegisterData;
};

const registerUserInformation = (userData) => {
  userRef.doc(userData.id).set({
    uid: userData.id,
    email: userData.email,
    name: userData.name,
    created_at: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

const getUserServePlaceData = async (userId, action) => {
  const assignRef = action === "favorite" ? favRef : bmRef;
  const placeIdData = await assignRef
    .where("user_id", "==", userId)
    .get()
    .then((placeSnapShot) =>
      placeSnapShot.docs.map((doc) => doc.get("place_id"))
    );
  return placeIdData;
};

const registerPlace = async (place, action) => {
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

const registerUserPlace = async (placeId, userId, action) => {
  const assignRef = action === "favorite" ? favRef : bmRef;
  await assignRef.doc().set({
    user_id: userId,
    place_id: placeId,
    created_at: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

const registerActivity = async (placeId, userId, userName, actionName) => {
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

const deleteUserAction = async (placeId, userId, action) => {
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

const getRankingTop = async (action) => {
  const assignKey = action === "favorite" ? "favorite_count" : "bookmark_count";
  const rankingData = await placeRef
    .orderBy(assignKey, "desc")
    .orderBy("created_at", "desc")
    .limit(7)
    .get()
    .then((rankingSnapShot) => {
      return rankingSnapShot.docs.map((doc) => doc.data());
    });
  return rankingData;
};

const registerUserAction = async (place, userId, userName, action) => {
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

const userRegisteredPlaces = async (action, userId) => {
  const assignRef = action === "favorite" ? favRef : bmRef;
  const querySnapShot = await assignRef
    .where("user_id", "==", userId)
    .orderBy("created_at", "desc")
    .get();
  const promises = querySnapShot.docs.map(async (activeDoc) => {
    const placeId = activeDoc.data().place_id;
    const placeData = await placeRef
      .doc(placeId)
      .get()
      .then((placeDoc) => {
        if (!placeDoc.exists) return;
        return placeDoc.data();
      });
    return placeData;
  });
  const registeredPlaceData = await Promise.all(promises);
  return registeredPlaceData;
};

const getActivityCountNum = async () => {
  const activityCountNum = await activeCountRef
    .doc("count")
    .get()
    .then((activeDoc) => {
      return activeDoc.data().activityCount;
    });
  return activityCountNum;
};

const getActivityDetailData = async (activeDoc) => {
  const placeId = activeDoc.data().place_id;
  const name = activeDoc.data().username;
  const userAction = activeDoc.data().action;
  const createTime = activeDoc.data().created_at.toDate();
  const createDate = `${createTime.getFullYear()}/${
    createTime.getMonth() + 1
  }/${createTime.getDate()} ${createTime.getHours()}:${createTime.getMinutes()}:${createTime.getSeconds()}`;
  const activityData = await placeRef
    .doc(placeId)
    .get()
    .then((placeDoc) => {
      if (placeDoc.exists) {
        const placeData = {
          ...placeDoc.data(),
          ...{
            action: userAction,
            created_at: createDate,
            userName: name,
          },
        };
        return placeData;
      }
    });
  return activityData;
};

const getActivitiesData = async (limit, startToken) => {
  let nextToken = "";
  let query = activeRef.orderBy("created_at", "desc").limit(limit);
  if (startToken !== null) {
    const [seconds, nanoseconds] = startToken.split(":");
    const timestamp = new firebase.firestore.Timestamp(seconds, nanoseconds);
    query = query.startAfter(timestamp);
  }
  const activeSnapShot = await query.get();
  // limitよりも多い件数データがあるならnextTokenを作成しておく
  if (activeSnapShot.docs.length >= limit) {
    const lastData = activeSnapShot.docs[activeSnapShot.docs.length - 1].data();
    const time = lastData.created_at;
    nextToken = `${time.seconds}:${time.nanoseconds}`;
  }
  const promises = activeSnapShot.docs.map(async (activeDoc) => {
    return await getActivityDetailData(activeDoc);
  });
  const activityData10 = (await Promise.all(promises)).filter((el) => el);
  return { activityData10, nextToken };
};

const FirebaseService = {
  onLogin,
  onSignUp,
  registerActivity,
  registerUserAction,
  registerUserInformation,
  deleteUserAction,
  getActivityCountNum,
  getActivitiesData,
  getRankingTop,
  getUserServePlaceData,
  userRegisteredPlaces,
};

export default FirebaseService;
