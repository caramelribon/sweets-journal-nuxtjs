import firebase from "~/plugins/firebase";
import {
  registerPlace,
  registerUserPlace,
  registerActivity,
  deleteAction,
  getUserServePlaceData,
} from "~/services/firebaseService";

const db = firebase.firestore();
const userRef = db.collection("users");
const placeRef = db.collection("places");

export const state = () => ({
  user: {
    uid: "",
    email: "",
    name: "",
    login: false,
  },
  userFav: [],
  userBm: [],
});

export const getters = {
  user: (state) => {
    return state.user;
  },
};

export const actions = {
  // login機能
  checkLogin({ commit, dispatch }) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        commit("getData", {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        });
        commit("switchLogin");
        dispatch("getUserServePlace", user.uid);
      } else {
        commit("deleteLogin");
      }
    });
  },
  // signUp機能
  signUp({ commit }, userData) {
    userRef.doc(userData.uid).set({
      uid: userData.uid,
      email: userData.email,
      name: userData.displayName,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    });
    commit("getData", {
      uid: userData.uid,
      email: userData.email,
      name: userData.displayName,
    });
  },
  // ログインしたユーザの保存しているお店の取得
  getUserServePlace({ commit }, userId) {
    getUserServePlaceData(userId, 'favorite').then((result) => {
      commit("registerUserFavPlace", result);
    });
    getUserServePlaceData(userId, 'mark').then((result) => {
      commit("registerUserBmPlace", result);
    });
  },
  // お気に入り登録機能
  onFavorite({ commit, state }, place) {
    // firebase関係
    placeRef
      .doc(place.id)
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          // お店の情報がすでに登録されていたら、favorite_countを+1して更新
          const favCount = doc.data().favorite_count + 1;
          await placeRef.doc(place.id).update({
            favorite_count: favCount,
          });
        } else {
          // お店の情報が登録されていなかったら、登録
          await registerPlace(place, 'favorite');
        }
        // ユーザIDとお店のIDをfavoritesに登録
        await registerUserPlace(place.id, state.user.uid, 'favorite');
        // Activityの登録
        await registerActivity(place.id, state.user.uid, state.user.name, 'favorite');
      });
    // stateのuserFavに登録
    commit("registerFav", place);
  },
  // お気に入り解除機能
  delFavorite({ commit, state }, place) {
    // favoritesからユーザIDとお店のIDの削除とActivityの削除
    deleteAction(place.id, state.user.uid, 'favorite');
    // stateのuserFavからplace_idを削除
    commit("deleteFav", place);
  },
  // 気になる登録機能
  onBookmark({ commit, state }, place) {
    // firebase関係
    placeRef
      .doc(place.id)
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          // お店の情報がすでに登録されていたら、bookmark_countを+1して更新
          const bmCount = doc.data().bookmark_count + 1;
          await placeRef.doc(place.id).update({
            bookmark_count: bmCount,
          });
        } else {
          // お店の情報が登録されていなかったら、登録
          await registerPlace(place, 'mark');
        }
        // ユーザIDとお店のIDをbookmarksに登録
        await registerUserPlace(place.id, state.user.uid, 'mark');
        // Activityの登録
        await registerActivity(place.id, state.user.uid, state.user.name, 'mark');
      });
    // stateのuserFavに登録
    commit("registerBm", place);
  },
  // 気になる削除機能
  delBookmark({ commit, state }, place) {
    // bookmarksからユーザIDとお店のIDの削除とActivityの削除
    deleteAction(place.id, state.user.uid, 'mark');
    // stateのuserFavからplace_idを削除
    commit("deleteBm", place);
  }
};

export const mutations = {
  getData: function (state, payload) {
    console.log(payload.uid, payload.email, payload.name);
    state.user.uid = payload.uid;
    state.user.email = payload.email;
    state.user.name = payload.name;
  },
  switchLogin: function (state) {
    state.user.login = true;
  },
  deleteLogin: function (state) {
    state.user.login = false;
  },
  signOut: function (state) {
    state.user.uid = "";
    state.user.email = "";
    state.user.login = false;
  },
  registerUserFavPlace: function (state, payload) {
    state.userFav = payload;
  },
  registerUserBmPlace: function (state, payload) {
    state.userBm = payload;
  },
  registerFav: function (state, payload) {
    state.userFav.push(payload.id);
  },
  registerBm: function (state, payload) {
    state.userBm.push(payload.id);
  },
  deleteFav: function (state, payload) {
    state.userFav = state.userFav.filter((id) => id !== payload.id);
  },
  deleteBm: function (state, payload) {
    state.userBm = state.userBm.filter((id) => id !== payload.id);
  },
};
