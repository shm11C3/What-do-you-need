import { createStore } from "vuex";
import auth from "./auth.js";
import form from "./form.js";

export default createStore({
  modules: {
    auth,
    form,
  },

  actions: {
    logout({ commit }) {
      commit("auth/reset");
      commit("form/reset");
    },
  },
});
