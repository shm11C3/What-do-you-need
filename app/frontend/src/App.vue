<template>
  <div>
    <div v-show="!isLoading">
      <header>
        <HeaderNav />
      </header>
      <main>
        <div id="app">
          <router-view />
        </div>
      </main>
    </div>
    <div v-show="isLoading" class="mt-20">
      <LoadingSpinner />
    </div>
  </div>
</template>

<script setup>
import HeaderNav from "./components/HeaderNav.vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { useStore } from "vuex";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import userFetcher from "@/js/fetchers/userFetcher";
import LoadingSpinner from "./components/parts/LoadingSpinner.vue";
import { useCookies } from "vue3-cookies";

const store = useStore();
const auth0 = useAuth0();
const router = useRouter();
const { cookies } = useCookies();

const isNearingExpirationIdToken = ref(false);
const idTokenClaims = ref();

/**
 * ID Token の Exp を1分毎に検証し期限切れ3分前に`true`を返す
 */
setInterval(() => {
  if (!store.getters.idTokenClaims) {
    return null;
  }

  const now_unix_s = Math.round(new Date().getTime() / 1000);
  isNearingExpirationIdToken.value =
    now_unix_s + 180 > store.getters.idTokenExpiration;
}, 60000);

/**
 * IdTokenがVuexに登録されていない場合に取得する
 */
const fetchIdToken = () => {
  // 認証しているか
  if (!auth0.isAuthenticated) {
    return null;
  }

  let idTokenClaims = store.getters.idTokenClaims;

  // idTokenがvuexに保存されているか
  if (!idTokenClaims) {
    return auth0.idTokenClaims.value;
  }

  return idTokenClaims;
};

const getUserProfile = async () => {
  store.dispatch("setUserProfileIsLoading", true);

  const { fetchUserProfile } = userFetcher();

  try {
    const userProfile = JSON.parse(JSON.stringify(await fetchUserProfile()));

    if (userProfile[1].isExist_userProfile) {
      store.dispatch("setUserProfile", userProfile[0]);
      cookies.set("userProfile", userProfile[0], null, "/");
    } else {
      store.dispatch("setUserProfile", null);
      cookies.set("userProfile", null, null, "/");

      // Priority to `email_verified` errors
      if (store.getters.email_verified) {
        router.push("/user/register");
      }
    }
  } catch (e) {
    console.error(e);
    store.dispatch("logout");
  }

  store.dispatch("setUserProfileIsLoading", false);
};

const isLoading = auth0.isLoading;

// 有効期限に近づいたらリロードさせる
watch(isNearingExpirationIdToken, (e) => {
  if (!e) return;
  router.go({ path: router.currentRoute.path, force: true });
});

watch(idTokenClaims, (e) => {
  if (!e) return;
  store.dispatch("setIdTokenClaims", e);
  getUserProfile();
});

/**
 * Set vuex
 * - `isAuthenticated`
 * - `email_verified`
 * - `userProfile`
 */
const setAuthStatus_toVuex_fromCookies = () => {
  if (cookies.isKey("isAuthenticated")) {
    store.dispatch("setIsAuthenticated", cookies.get("isAuthenticated"));
  }

  if (cookies.isKey("email_verified")) {
    store.dispatch("setEmail_verified", cookies.get("email_verified"));
  }

  if (cookies.keys("userProfile")) {
    store.dispatch("setUserProfile", cookies.get("userProfile"));
  }
};

/**
 * Set authentication status `isAuthenticated`, `email_verified` to cookie
 */
const setAuthStatusToCookie = () => {
  if (auth0.isLoading.value) {
    return;
  }

  const user = auth0.user.value;

  if (auth0.isAuthenticated.value) {
    cookies.set("isAuthenticated", auth0.isAuthenticated.value, null, "/");
  }

  if (auth0.user.value) {
    cookies.set("email_verified", user.email_verified, null, "/");
  }
};

watch([auth0.isLoading, auth0.isAuthenticated, auth0.user], () => {
  idTokenClaims.value = fetchIdToken();

  // Set authentication status `isAuthenticated`, `email_verified` to vuex
  store.dispatch("setIsAuthenticated", auth0.isAuthenticated.value);

  const user = auth0.user.value;
  if (user != undefined && user.email_verified != undefined) {
    store.dispatch("setEmail_verified", user.email_verified);

    if (!user.email_verified) {
      router.push("/error/email-verify");
    }
  }

  setAuthStatusToCookie();
});

watch(isLoading, (e) => {
  store.dispatch("setIsLoading", e);
});

setAuthStatus_toVuex_fromCookies();
</script>
