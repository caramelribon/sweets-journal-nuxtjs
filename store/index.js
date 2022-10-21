import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const userRef = db.collection("users");

export const state = () => ({
  user: {
    uid: "",
    email: "",
    name: "",
    login: false,
  },
});

export const getters = {
  user: (state) => {
    return state.user;
  },
};

export const actions = {
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
};
