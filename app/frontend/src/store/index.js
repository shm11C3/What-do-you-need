import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./auth.js";

export default createStore({
  modules: {
    auth,
  },

  plugins: [
    createPersistedState({
      key: "vuex",
      paths: [
        "auth.isAuthenticated",
        "auth.email_verified",
        "auth.userProfile",
      ],
      storage: window.window.localStorage,
    }),
  ],
});
