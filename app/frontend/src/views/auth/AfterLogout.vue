<template>
  <LoadingSpinner class="mt-20" />
</template>
<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import LoadingSpinner from "../../components/parts/LoadingSpinner.vue";

const router = useRouter();

onMounted(() => {
  router.push("/");
});
</script>
