<template>
  <LoadingSpinner class="mt-20" />
</template>
<script>
import { useAuth0 } from "@auth0/auth0-vue";
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import userFetcher from "../../js/fetchers/userFetcher";
import LoadingSpinner from "../../components/parts/LoadingSpinner.vue";

export default {
  name: "AfterLogin",
  components: {
    LoadingSpinner,
  },

  setup() {
    const auth0 = useAuth0();
    const router = useRouter();
    const store = useStore();

    let isLoading = auth0.isLoading;
    let isAuthenticated = auth0.isAuthenticated;

    onMounted(() => {
      if (!isLoading.value && !isAuthenticated.value) {
        router.push("/");
      }
    });

    const registeredIdTokenClaims = computed(() => {
      return store.getters.idTokenClaims;
    });

    return {
      registeredIdTokenClaims,

      isLoading: isLoading,
      auth0User: auth0.user,
      isAuthRegisterCompleted: ref(false),
      isUserRegisterCompleted: ref(false),
      isAllRegistered: ref(false),
      isAuthenticated: isAuthenticated,
      idTokenClaims: auth0.idTokenClaims,
    };
  },

  watch: {
    /**
     * ID Token が登録されたタイミングでユーザープロフィールを取得する
     */
    registeredIdTokenClaims: async function () {
      const { fetchUserProfile } = userFetcher();

      try {
        const userProfile = JSON.parse(
          JSON.stringify(await fetchUserProfile())
        );

        if (userProfile[1].isExist_userProfile) {
          this.$store.dispatch("setUserProfile", userProfile[0]);
        }
      } catch (e) {
        console.error(e);
        this.$store.dispatch("logout");

        this.$router.push("/"); // [Todo] エラーページへリダイレクトさせる
      }

      if (this.$store.getters.userProfile) {
        this.isUserRegisterCompleted = true;
      }

      if (this.isAuthRegisterCompleted) {
        this.isAllRegistered = true;
      }
    },

    /**
     * `auth0.isLoading`更新時に認証状態を保存
     */
    isLoading: function () {
      this.storeAuthenticate();

      if (this.$store.getters.isAuthenticated) {
        this.isAuthRegisterCompleted = true;
      }

      if (this.isUserRegisterCompleted) {
        this.isAllRegistered = true;
      }
    },

    /**
     * すべての登録処理終了時に認証の状態をチェックする
     *
     * @param {boolean} e
     */
    isAllRegistered: function (e) {
      if (!e || !this.$store.getters.isAuthenticated) {
        return;
      }

      // 認証のチェック
      if (!this.$store.getters.email_verified) {
        this.$router.push("/error/email-verify");
        return;
      }

      // バックエンドAPIのユーザープロフィール登録チェック
      if (!this.$store.getters.userProfile) {
        this.$router.push("/user/register");
        return;
      }

      this.$router.push("/");
    },
  },

  methods: {
    /**
     * Vuexに認証の状態を保存
     */
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
