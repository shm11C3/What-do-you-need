<template>
  <LoadingSpinner class="mt-20" />
</template>
<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
import LoadingSpinner from "../../components/parts/LoadingSpinner.vue";
import { useStore } from "vuex";
import { useCookies } from "vue3-cookies";

const auth0 = useAuth0();
const store = useStore();
const { cookies } = useCookies();

store.dispatch("logout");

cookies.remove("userProfile", "/");
cookies.remove("isAuthenticated", "/");
cookies.remove("email_verified", "/");

auth0.logout({
  returnTo: process.env.VUE_APP_REDIRECT_URL + "logout",
});
</script>
