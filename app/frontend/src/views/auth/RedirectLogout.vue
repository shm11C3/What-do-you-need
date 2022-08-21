<template>
  <LoadingSpinner class="mt-20" />
</template>
<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
import LoadingSpinner from "../../components/parts/LoadingSpinner.vue";

const auth0 = useAuth0();

auth0.logout({
  returnTo: process.env.VUE_APP_REDIRECT_URL + "logout",
});
</script>
