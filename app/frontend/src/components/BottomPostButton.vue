<template>
  <div class="fixed bottom-10 lg:bottom-12 right-5 lg:right-12">
    <router-link
      to="/post/create"
      v-show="pathToDisplayButtons.includes(path)"
      class="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-4 px-8 rounded-full shadow-lg"
      >Write Post</router-link
    >
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const pathToDisplayButtons = ["/"];

const path = computed(() => {
  return route.path;
});
</script>
