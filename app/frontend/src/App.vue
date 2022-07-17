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

export default {
  components: {
    HeaderNav, //読み込む際はここにも追記必要
  },

  name: "App",

  setup() {
    const store = useStore();

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

      // idTokenの有効期限を確認
      if (idTokenClaims.exp < Date.now() + 600000) {
        return useAuth0().idTokenClaims;
      }

      return idTokenClaims;
    };

    const idTokenClaims = fetchIdToken();

    return {
      idTokenClaims: idTokenClaims,
    };
  },
  watch: {
    idTokenClaims: function (e) {
      this.$store.dispatch("setIdTokenClaims", e);
    },
  },
};
</script>
