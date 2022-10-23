import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const favRef = db.collection("favorites");
const placeRef = db.collection("places");
const activeRef = db.collection("activities");
const activeCountRef = db.collection("activityCount");

export const registerPlace = async (place) => {
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
    favorite_count: 1,
    bookmark_count: 0,
    create_at: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const registerUserFavPlace = async (placeId, userId) => {
  favRef.doc().set({
    user_id: userId,
    place_id: placeId,
    created_at: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const registerFavActivity = async (placeId, userId, userName) => {
  // activitiesに登録
  await activeRef.doc().set({
    user_id: userId,
    username: userName,
    place_id: placeId,
    action: "favorite",
    create_at: firebase.firestore.FieldValue.serverTimestamp(),
  });
  // activityCountを+1して更新
  await activeCountRef
    .doc("count")
    .get()
    .then((doc) => {
      const actCount = doc.data().activityCount + 1;
      activeCountRef.doc("count").update({
        activityCount: actCount,
      });
    });
};

export const delFavActivity = async (placeId, userId) => {
  // activityを削除
  await activeRef
    .where("user_id", "==", userId)
    .where("place_id", "==", placeId)
    .where("action", "==", "favorite")
    .get()
    .then((snapShot) => {
      snapShot.forEach(async (doc) => {
        if (doc.exists) {
          await doc.ref.delete();
          console.log("Cancel activity of favorite!");
        } else {
          console.log("Not data!");
        }
      });
    });
  // activityCountを-1して更新
  await activeCountRef
    .doc("count")
    .get()
    .then((doc) => {
      const actCount = doc.data().activityCount - 1;
      activeCountRef.doc("count").update({
        activityCount: actCount,
      });
    });
};

export const deleteFavorite = async (placeId, userId) => {
  await favRef
    .where("user_id", "==", userId)
    .where("place_id", "==", placeId)
    .get()
    .then((snapShot) => {
      snapShot.forEach(async (doc) => {
        if (doc.exists) {
          // favorites内のdocument削除
          await doc.ref.delete();
          // placeのfavorite_countを-1する
          placeRef
            .doc(placeId)
            .get()
            .then((placeDoc) => {
              if (placeDoc.exists) {
                const favCount = placeDoc.data().favorite_count - 1;
                placeRef.doc(placeId).update({
                  favorite_count: favCount,
                });
              }
            })
            .catch((error) => {
              console.log("Can not delete favorited place!", error);
            });
        }
      });
    });
  await delFavActivity(placeId, userId);
};
