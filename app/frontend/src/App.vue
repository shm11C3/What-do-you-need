<template>
  <div>
    <header>
      <HeaderNav />
    </header>
    <main>
      <div id="app">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import HeaderNav from "./components/HeaderNav.vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { useStore } from "vuex";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    HeaderNav, //読み込む際はここにも追記必要
  },

  name: "App",

  setup() {
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
      if (!store.getters.isAuthenticated) {
        return null;
      }

      let idTokenClaims = store.getters.idTokenClaims;

      // idTokenがvuexに保存されているか
      if (!idTokenClaims) {
        return auth0.idTokenClaims;
      }

      return idTokenClaims;
    };

    // 有効期限に近づいたらリロードさせる
    watch(isNearingExpirationIdToken, (e) => {
      if (!e) return;
      router.go({ path: router.currentRoute.path, force: true });
    });

    watch(idTokenClaims, (e) => {
      if (!e) return;
      store.dispatch("setIdTokenClaims", e.value);
    });

    watch(auth0.isLoading, () => {
      idTokenClaims.value = fetchIdToken();
    });

    return {
      isNearingExpirationIdToken,
      idTokenClaims,
    };
  },
};
</script>
