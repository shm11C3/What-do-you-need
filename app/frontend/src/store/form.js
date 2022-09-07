const form = {
  state: {
    userProfile: {},
    post: {},
  },
  getters: {
    form_userProfile(state) {
      return state.userProfile;
    },
    form_post(state) {
      return state.post;
    },
  },
  mutations: {
    form_userProfile(state, e) {
      state.userProfile = e;
    },
    form_post(state, e) {
      state.post = e;
    },
    form_post_isSaved(state, e) {
      state.post.isSaved = e;
    },
  },
  actions: {
    setForm_userProfile({ commit }, e) {
      commit("form_userProfile", e);
    },
    setForm_post({ commit }, e) {
      commit("form_post", e);
    },
    setForm_post_isSaved({ commit }, e) {
      commit("form_post_isSaved", e);
    },
  },
};

export default form;
