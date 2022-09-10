import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store/index.js";

const privatePages = ["/user/profile", "post/create"];

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
    path: "/logout",
    name: "logout",
    component: () => import("../views/auth/RedirectLogout.vue"),
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
    path: "/user/register",
    name: "registerUserProfile",
    component: () => import("../views/user/RegisterProfileView.vue"),
  },
  {
    path: "/user/profile",
    name: "userProfile",
    component: () => import("../views/user/ProfileView.vue"),
  },
  {
    path: "/user/setting/password",
    name: "ChangePassword",
    component: () => import("../views/user/ChangePassword.vue"),
  },
  {
    path: "/user/setting/delete-account",
    name: "deleteUser",
    component: () => import("../views/user/DeleteUser.vue"),
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
  {
    path: "/sources",
    name: "appSources",
    component: () => import("../views/AppSources.vue"),
  },
  {
    path: "/contact-as",
    name: "inquiryLink",
    component: () => import("../views/InquiryLink.vue"),
  },
  {
    path: "/post/create",
    name: "createPost",
    component: () => import("../views/post/NewPostSubmit.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authRequired = privatePages.includes(to.path);

  const isAuthenticated = store.getters.isAuthenticated;
  const email_verified = store.getters.email_verified;

  // email verifyの検証
  if (isAuthenticated && !email_verified && authRequired) {
    next("/error/email-verify");
    return;
  }

  // ユーザー登録の検証
  if (isAuthenticated && !store.getters.userProfile && authRequired) {
    next("/user/register");
    return;
  }

  // ログインユーザ用パス
  if (authRequired && !isAuthenticated) {
    // todo `to`の値をvuexで保存し、リダイレクト先として後で呼び出す
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  router["referrer"] = from;
  next();
});

export default router;
