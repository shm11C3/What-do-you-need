import Vuex from "vuex";
import { createStore } from "vuex-extensions";
import auth from "./auth.js";
import form from "./form.js";

export default createStore(Vuex.Store, {
  modules: {
    auth,
    form,
  },

  plugins: [],
});
