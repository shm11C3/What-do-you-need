<!--ローディング時のUIコンポーネントを追加する-->
<script>
import { useAuth0 } from "@auth0/auth0-vue";

export default {
  name: "App",
  setup() {
    const auth0 = useAuth0();

    return {
      login() {
        auth0.loginWithRedirect({
          redirect_uri: process.env.VUE_APP_URL + "/user/redirect/",
        });
      },
      auth0User: auth0.user,
      isAuthenticated: auth0.isAuthenticated,
      idTokenClaims: auth0.idTokenClaims,
    };
  },
  watch: {
    isAuthenticated: function (e) {
      this.$store.dispatch("setIsAuthenticated", e);
      if (!e) {
        this.$store.dispatch("logout"); // vuexの認証情報を削除する
        this.login();
      }
    },
    auth0User: function (e) {
      let email_verified = false;
      if (this.isAuthenticated) {
        email_verified = e.email_verified;
      }

      this.$store.dispatch("setEmail_verified", email_verified);
    },
    idTokenClaims: function (e) {
      let idTokenClaims = null;
      if (e) {
        idTokenClaims = e;
      }
      this.$store.dispatch("setIdTokenClaims", idTokenClaims);
    },
  },
};
</script>
