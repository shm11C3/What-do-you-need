import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store/index.js";

const privatePages = ["/user/profile"];

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/RedirectLoginPage.vue"),
  },
  {
    path: "/error/email-verify",
    name: "emailVerifyError",
    component: () => import("../views/error/EmailIsNotVerified.vue"),
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/user/redirect/login",
    name: "afterLogin",
    component: () => import("../views/auth/AfterLogin.vue"),
  },
  {
    path: "/user/redirect/logout",
    name: "afterLogout",
    component: () => import("../views/auth/AfterLogout.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authRequired = privatePages.includes(to.path);

  const isAuthenticated = store.state.auth.isAuthenticated;
  const email_verified = store.state.auth.email_verified;

  // email verifyの検証
  if (
    isAuthenticated &&
    !email_verified &&
    !to.path.includes("/error/email-verify")
  ) {
    next("/error/email-verify");
    return;
  }

  if (to.path.includes("/user/redirect/login") && isAuthenticated) {
    return false;
  }

  // ログインユーザ用パス
  if (authRequired && !isAuthenticated) {
    // todo `to`の値をvuexで保存し、リダイレクト先として後で呼び出す
    next("/login");
  } else {
    next();
  }
});

export default router;
