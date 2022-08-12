const auth = {
  state: {
    isAuthenticated: false,
    email_verified: false,
    idTokenClaims: null, // idTokenは`vuex-persistedstate`には保存しない
    userProfile: null,
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    email_verified(state) {
      return state.email_verified;
    },
    idTokenClaims(state) {
      return state.idTokenClaims;
    },
    idToken(state) {
      return state.idTokenClaims.__raw;
    },
    idTokenExpiration(state) {
      return state.idTokenClaims.exp;
    },
    userProfile(state) {
      return state.userProfile;
    },
    auth_id(state) {
      return state.idTokenClaims.sub;
    },
  },
  mutations: {
    isAuthenticated(state, e) {
      state.isAuthenticated = e;
    },

    email_verified(state, e) {
      state.email_verified = e;
    },

    idTokenClaims(state, e) {
      state.idTokenClaims = e;
    },
    userProfile(state, e) {
      state.userProfile = e;
    },
  },
  actions: {
    setIsAuthenticated({ commit }, e) {
      commit("isAuthenticated", e);
    },

    setEmail_verified({ commit }, e) {
      commit("email_verified", e);
    },

    setIdTokenClaims({ commit }, e) {
      commit("idTokenClaims", e);
    },
    logout({ commit }) {
      commit("isAuthenticated", false);
      commit("email_verified", false);
      commit("idTokenClaims", null);
      commit("userProfile", null);
    },
    setUserProfile({ commit }, e) {
      commit("userProfile", e);
    },
    removeUserProfile({ commit }) {
      commit("userProfile", null);
    },
  },
};

export default auth;
