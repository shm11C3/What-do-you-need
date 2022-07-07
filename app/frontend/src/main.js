import { createApp } from "vue";
import { createAuth0 } from "@auth0/auth0-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.scss";

createApp(App)
  .use(
    createAuth0({
      domain: process.env.VUE_APP_AUTH0_DOMAIN,
      client_id: process.env.VUE_APP_AUTH0_CLIENT_ID,
      redirect_uri: window.location.origin,
    })
  )
  .use(store)
  .use(router)
  .mount("#app");
