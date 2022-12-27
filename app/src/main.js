import { createApp } from "vue";
import { createAuth0 } from "@auth0/auth0-vue";
import App from "./App.vue";
import VueLazyLoad from "vue3-lazyload";
import router from "./router";
import store from "./store";
import "./index.scss";
import { globalCookiesConfig } from "vue3-cookies";

const VUE_LAZY_LOAD_CONFIG = {
  error: "https://dummyimage.com/800x600/ccc/999.png&text=Not+Found",
  loading: "https://dummyimage.com/800x600/dcdcdc/999.png&text=Now+Loading",
  log: process.env.VUE_APP_DEBUG ?? false,
};

createApp(App)
  .use(
    createAuth0({
      domain: process.env.VUE_APP_AUTH0_DOMAIN,
      client_id: process.env.VUE_APP_AUTH0_CLIENT_ID,
      redirect_uri: window.location.origin,
      cacheLocation: "localstorage",
    })
  )
  .use(VueLazyLoad, VUE_LAZY_LOAD_CONFIG)
  .use(store)
  .use(router)
  .mount("#app");

globalCookiesConfig({
  expireTimes: "30d",
  path: "/",
  domain: "",
  secure: true,
  sameSite: "None",
});
