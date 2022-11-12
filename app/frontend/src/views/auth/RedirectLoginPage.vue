<template>
  <LoadingSpinner class="mt-20" />
</template>
<script>
import { useAuth0 } from "@auth0/auth0-vue";
import LoadingSpinner from "../../components/parts/LoadingSpinner.vue";

export default {
  name: "RedirectLogin",
  components: {
    LoadingSpinner,
  },
  setup() {
    const auth0 = useAuth0();
    auth0.loginWithRedirect({
      redirect_uri: process.env.VUE_APP_REDIRECT_URL + "login",
    });
  },
};
</script>
