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
      const post = state.post;

      if (e != null) {
        post.ulid = e.ulid;
        post.title = e.title;
        post.content = e.content;
        post.category_uuid = e.category_uuid;
        post.is_draft = e.is_draft;
        post.is_publish = e.is_publish;
        post.isSaved = e.isSaved;
      } else {
        state.post = {};
      }
    },
    form_post_isSaved(state, e) {
      state.post.isSaved = e;
    },
    image_group_uuid(state, e) {
      state.post.image_group_uuid = e;
    },
    reset: (state) => {
      state.userProfile = {};
      state.post = {};
    },
  },
  actions: {
    setForm_userProfile({ commit }, e) {
      commit("form_userProfile", e);
    },
    setForm_post({ commit }, e) {
      commit("form_post", e);
    },
    setImageGroupUuid({ commit }, e) {
      commit("image_group_uuid", e);
    },
    setForm_post_isSaved({ commit }, e) {
      commit("form_post_isSaved", e);
    },
  },
};

export default form;
