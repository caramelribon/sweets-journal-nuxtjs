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
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

const getUserServePlaceData = async (userId, action) => {
  const assignRef = action === "favorite" ? favRef : bmRef;
  const placeIdData = await assignRef
    .where("userId", "==", userId)
    .get()
    .then((placeSnapShot) =>
      placeSnapShot.docs.map((doc) => doc.get("placeId"))
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
    catchCopy: place.catchcopy,
    open: place.open,
    photo: place.photo,
    url: place.url,
    favoriteCount: action === "favorite" ? 1 : 0,
    bookmarkCount: action === "favorite" ? 0 : 1,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

const registerUserPlace = async (id, uid, action) => {
  const assignRef = action === "favorite" ? favRef : bmRef;
  await assignRef.doc().set({
    userId: uid,
    placeId: id,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

const registerActivity = async (id, uid, name, actionName) => {
  const batch = db.batch();
  // activitiesに登録
  const activeDocRef = await activeRef.doc();
  batch.set(activeDocRef, {
    userId: uid,
    userName: name,
    placeId: id,
    action: actionName,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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
    .where("userId", "==", userId)
    .where("placeId", "==", placeId)
    .get();
  batch.delete(querySnapshot.docs[0].ref);
  // placeのfavorite_count or bookmark_countを-1する
  const assignKey = action === "favorite" ? "favoriteCount" : "bookmarkCount";
  const placeDocRef = await placeRef.doc(placeId);
  batch.update(placeDocRef, {
    [assignKey]: firebase.firestore.FieldValue.increment(-1),
  });
  // activityを削除
  const activeQuerySnapshot = await activeRef
    .where("userId", "==", userId)
    .where("placeId", "==", placeId)
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
  const assignKey = action === "favorite" ? "favoriteCount" : "bookmarkCount";
  const rankingData = await placeRef
    .orderBy(assignKey, "desc")
    .orderBy("createdAt", "desc")
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
          action === "favorite" ? "favoriteCount" : "bookmarkCount";
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
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();
  const promises = querySnapShot.docs.map(async (activeDoc) => {
    const placeId = activeDoc.data().placeId;
    const placeData = await placeRef
      .doc(placeId)
      .get()
      .then((placeDoc) => {
        if (placeDoc.exists) {
          return placeDoc.data();
        }
      });
    return placeData;
  });
  const registeredPlaceData = (await Promise.all(promises)).filter((el) => el);
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
  const placeId = activeDoc.data().placeId;
  const name = activeDoc.data().userName;
  const userAction = activeDoc.data().action;
  const createTime = activeDoc.data().createdAt.toDate();
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
          action: userAction,
          createdAt: createDate,
          userName: name,
        };
        return placeData;
      }
    });
  return activityData;
};

const getActivitiesData = async (limit, startToken) => {
  let nextToken = "";
  let query = activeRef.orderBy("createdAt", "desc").limit(limit);
  if (startToken !== null) {
    query = query.startAfter(startToken);
  }
  const activeSnapShot = await query.get();
  // limitよりも多い件数データがあるならnextTokenを作成しておく
  if (activeSnapShot.docs.length >= limit) {
    const lastData = activeSnapShot.docs[activeSnapShot.docs.length - 1].data();
    nextToken = lastData.createdAt;
  }
  const promises = activeSnapShot.docs.map(async (activeDoc) => {
    return await getActivityDetailData(activeDoc);
  });
  const activityData = (await Promise.all(promises)).filter((el) => el);
  return { activityData, nextToken };
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
