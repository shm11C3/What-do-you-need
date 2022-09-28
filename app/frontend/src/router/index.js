import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store/index.js";

const privatePages = ["/user/profile", "/post/create"];

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { title: "Home", desc: "Home" },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/RedirectLoginPage.vue"),
    meta: { title: "login", desc: "Redirect to login page" },
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("../views/auth/RedirectLogout.vue"),
    meta: { title: "logout", desc: "Log out from your current account" },
  },
  {
    path: "/error/email-verify",
    name: "emailVerifyError",
    component: () => import("../views/error/EmailIsNotVerified.vue"),
    meta: { title: "email verify error", desc: "Email not verified" },
  },
  {
    path: "/user/register",
    name: "registerUserProfile",
    component: () => import("../views/user/RegisterProfileView.vue"),
    meta: { title: "Register User", desc: "Register new user" },
  },
  {
    path: "/user/profile",
    name: "userProfile",
    component: () => import("../views/user/ProfileView.vue"),
    meta: { title: "User Profile", desc: "Show my profile" },
  },
  {
    path: "/user/detail/:username",
    name: "userDetail",
    component: () => import("../views/user/userDetail.vue"),
    meta: { title: "user", desc: "Show current user profile" }, //TODO タイトルを動的に設定する
  },
  {
    path: "/user/setting/password",
    name: "ChangePassword",
    component: () => import("../views/user/ChangePassword.vue"),
    meta: { title: "Setting", desc: "Setting View" },
  },
  {
    path: "/user/setting/delete-account",
    name: "deleteUser",
    component: () => import("../views/user/DeleteUser.vue"),
    meta: { title: "Setting", desc: "Setting View" },
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
    meta: { title: "About", desc: "about" },
  },
  {
    path: "/contact-as",
    name: "inquiryLink",
    component: () => import("../views/InquiryLink.vue"),
    meta: { title: "Contact As", desc: "Contact As" },
  },
  {
    path: "/post/create",
    name: "createPost",
    component: () => import("../views/post/NewPostSubmit.vue"),
    meta: { title: "Write Post", desc: "Write Post" },
  },
  {
    path: "/post/:ulid",
    name: "postDetail",
    component: () => import("../views/post/PostDetail.vue"),
    meta: { title: "post", desc: "Post View" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("../views/error/NotFound.vue"),
    meta: { title: "Not Found", desc: "404 Not Found" },
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
