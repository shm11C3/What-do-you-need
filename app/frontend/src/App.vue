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

export default {
  components: {
    HeaderNav, //読み込む際はここにも追記必要
  },

  name: "App",

  setup() {
    const store = useStore();

    const isNearingExpirationIdToken = ref(false);

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
        return useAuth0().idTokenClaims;
      }

      return idTokenClaims;
    };

    const idTokenClaims = ref(fetchIdToken());

    // 有効期限に近づいたらIdTokenを更新する
    watch(isNearingExpirationIdToken, (e) => {
      if (!e) return;

      idTokenClaims.value = useAuth0().idTokenClaims;
    });

    return {
      isNearingExpirationIdToken,
      idTokenClaims,
    };
  },
  watch: {
    idTokenClaims: function (e) {
      this.$store.dispatch("setIdTokenClaims", e);
    },
  },
};
</script>
