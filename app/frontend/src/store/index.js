import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./auth.js";
import form from "./form.js";

export default createStore({
  modules: {
    auth,
    form,
  },

  plugins: [
    createPersistedState({
      key: "vuex",
      paths: [
        "auth.isAuthenticated",
        "auth.email_verified",
        "auth.userProfile",
        "form.post",
      ],
      storage: window.window.localStorage,
    }),
  ],
});
