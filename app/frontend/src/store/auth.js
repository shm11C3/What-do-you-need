const auth = {
  state: {
    isAuthenticated: false,
    email_verified: false,
    idTokenClaims: null,
    userProfile: null,
    isLoading: true,
    userProfileIsLoading: false,
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    userProfileIsLoading(state) {
      return state.userProfileIsLoading;
    },
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
    isLoading(state, e) {
      state.isLoading = e;
    },
    userProfileIsLoading(state, e) {
      state.userProfileIsLoading = e;
    },
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
    reset: (state) => {
      state.userProfile = null;
      state.isAuthenticated = false;
      state.email_verified = false;
      state.idTokenClaims = null;
      state.isLoading = true;
      state.userProfileIsLoading = false;
    },
  },
  actions: {
    setIsLoading({ commit }, e) {
      commit("isLoading", e);
    },
    setUserProfileIsLoading({ commit }, e) {
      commit("userProfileIsLoading", e);
    },
    setIsAuthenticated({ commit }, e) {
      commit("isAuthenticated", e);
    },

    setEmail_verified({ commit }, e) {
      commit("email_verified", e);
    },

    setIdTokenClaims({ commit }, e) {
      commit("idTokenClaims", e);
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
