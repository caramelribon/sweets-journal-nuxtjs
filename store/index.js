import firebase from "~/plugins/firebase";
import {
  registerFavPlace,
  registerBmPlace,
  registerFavActivity,
  registerBmActivity,
  registerUserFavPlace,
  registerUserBmPlace,
  deleteFavorite,
  deleteBookmark,
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
  checkLogin({ commit }) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        commit("getData", {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        });
        commit("switchLogin");
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
          await registerFavPlace(place);
        }
        // ユーザIDとお店のIDをfavoritesに登録
        await registerUserFavPlace(place.id, state.user.uid);
        // Activityの登録
        await registerFavActivity(place.id, state.user.uid, state.user.name);
      });
    // stateのuserFavに登録
    commit("registerFav", place);
  },
  // お気に入り解除機能
  delFavorite({ commit, state }, place) {
    // favoritesからユーザIDとお店のIDの削除とActivityの削除
    deleteFavorite(place.id, state.user.uid);
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
          await registerBmPlace(place);
        }
        // ユーザIDとお店のIDをfavoritesに登録
        await registerUserBmPlace(place.id, state.user.uid);
        // Activityの登録
        await registerBmActivity(place.id, state.user.uid, state.user.name);
      });
    // stateのuserFavに登録
    commit("registerBm", place);
  },
  // 気になる削除機能
  delBookmark({ commit, state }, place) {
    // favoritesからユーザIDとお店のIDの削除とActivityの削除
    deleteBookmark(place.id, state.user.uid);
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
