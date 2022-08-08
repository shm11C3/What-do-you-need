const form = {
  state: {
    userProfile: {},
  },
  getters: {
    form_userProfile(state) {
      return state.userProfile;
    },
  },
  mutations: {
    form_userProfile(state, e) {
      state.userProfile = e;
    },
  },
  actions: {
    setForm_userProfile({ commit }, e) {
      commit("form_userProfile", e);
    },
  },
};

export default form;
