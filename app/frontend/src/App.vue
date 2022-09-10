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

const store = useStore();
const auth0 = useAuth0();
const router = useRouter();

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

watch([auth0.isLoading, auth0.isAuthenticated, auth0.user], () => {
  idTokenClaims.value = fetchIdToken();

  const user = auth0.user.value;

  store.dispatch("setIsAuthenticated", auth0.isAuthenticated);

  if (user != undefined && user.email_verified != undefined) {
    store.dispatch("setEmail_verified", user.email_verified);
  }
});

watch(isLoading, (e) => {
  store.dispatch("setIsLoading", e);
});
</script>
