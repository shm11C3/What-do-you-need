<!--ローディング時のUIコンポーネントを追加する-->
<script>
import { useAuth0 } from "@auth0/auth0-vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "App",
  setup() {
    const auth0 = useAuth0();
    const router = useRouter();

    let isLoading = auth0.isLoading;
    let isAuthenticated = auth0.isAuthenticated;

    onMounted(() => {
      if (!isLoading.value && !isAuthenticated.value) {
        router.push("/");
      }
    });

    return {
      isLoading: isLoading,
      auth0User: auth0.user,
      isAuthenticated: isAuthenticated,
      idTokenClaims: auth0.idTokenClaims,
    };
  },
  watch: {
    isLoading: function () {
      this.storeAuthenticate();

      // 認証のチェック
      if (
        this.$store.getters.isAuthenticated &&
        this.$store.getters.email_verified
      ) {
        this.$router.push("/error/email-verify");
      }

      this.$router.push("/");
    },
  },
  methods: {
    // Vuexに認証の状態を保存
    storeAuthenticate() {
      let email_verified = false;
      let idTokenClaims = null;

      this.$store.dispatch("setIsAuthenticated", this.isAuthenticated);
      if (this.isAuthenticated) {
        email_verified = this.auth0User.email_verified;
        idTokenClaims = this.idTokenClaims;
      }

      this.$store.dispatch("setEmail_verified", email_verified);
      this.$store.dispatch("setIdTokenClaims", idTokenClaims);
    },
  },
};
</script>
