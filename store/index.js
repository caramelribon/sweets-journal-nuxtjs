import FirebaseService from "~/services/firebaseService";

export const state = () => ({
  user: {
    id: "",
    name: "",
    isLogin: false,
  },
  userFavPlace: [],
  userBmPlace: [],
});

export const getters = {
  user(state) {
    return state.user;
  },
  userFavPlace(state) {
    return state.userFavPlace;
  },
  userBmPlace(state) {
    return state.userBmPlace;
  },
};

export const actions = {
  // login機能
  async checkLogin({ commit, dispatch }, userData) {
    if (userData) {
      commit("getData", {
        id: userData.id,
        name: userData.name,
      });
      commit("switchLogin");
      dispatch("getUserServePlace", userData.id);
    } else {
      commit("deleteLogin");
    }
  },
  // signUp機能
  async signUp({ commit }, userData) {
    await FirebaseService.registerUserInformation(userData);
    commit("getData", {
      id: userData.id,
      name: userData.name,
    });
    commit("switchLogin");
  },
  // ログインしたユーザの保存しているお店の取得
  async getUserServePlace({ commit }, userId) {
    await FirebaseService.getUserServePlaceData(userId, "favorite").then(
      (result) => {
        commit("getUserFavPlace", result);
      }
    );
    await FirebaseService.getUserServePlaceData(userId, "mark").then(
      (result) => {
        commit("getUserBmPlace", result);
      }
    );
  },
  // お気に入り登録機能
  async onFavorite({ commit, state }, place) {
    // favorites・activities・placesへの登録
    await FirebaseService.registerUserAction(
      place,
      state.user.id,
      state.user.name,
      "favorite"
    );
    // stateのuserFavに登録
    commit("registerUserFavPlace", place);
  },
  // お気に入り解除機能
  async delFavorite({ commit, state }, place) {
    // favoritesからユーザIDとお店のIDの削除とActivityの削除
    await FirebaseService.deleteUserAction(place.id, state.user.id, "favorite");
    // stateのuserFavからplace_idを削除
    commit("deleteUserFavPlace", place);
  },
  // 気になる登録機能
  async onBookmark({ commit, state }, place) {
    await FirebaseService.registerUserAction(
      place,
      state.user.id,
      state.user.name,
      "mark"
    );
    // stateのuserFavに登録
    commit("registerUserBmPlace", place);
  },
  // 気になる削除機能
  async delBookmark({ commit, state }, place) {
    // bookmarksからユーザIDとお店のIDの削除とActivityの削除
    await FirebaseService.deleteUserAction(place.id, state.user.id, "mark");
    // stateのuserFavからplace_idを削除
    commit("deleteUserBmPlace", place);
  },
};

export const mutations = {
  getData(state, payload) {
    console.log(payload.id, payload.name);
    state.user.id = payload.id;
    state.user.name = payload.name;
  },
  switchLogin(state) {
    state.user.isLogin = true;
  },
  deleteLogin(state) {
    state.user.isLogin = false;
  },
  signOut(state) {
    state.user.id = "";
    state.user.name = "";
    state.user.isLogin = false;
  },
  // ログインして最初に取得
  getUserFavPlace(state, payload) {
    state.userFavPlace = payload;
  },
  getUserBmPlace(state, payload) {
    state.userBmPlace = payload;
  },
  // ログイン中に登録・削除
  registerUserFavPlace(state, payload) {
    state.userFavPlace.push(payload.id);
  },
  registerUserBmPlace(state, payload) {
    state.userBmPlace.push(payload.id);
  },
  deleteUserFavPlace(state, payload) {
    state.userFavPlace = state.userFavPlace.filter((id) => id !== payload.id);
  },
  deleteUserBmPlace(state, payload) {
    state.userBmPlace = state.userBmPlace.filter((id) => id !== payload.id);
  },
};
