<template>
  <div class="fixed bottom-10 lg:bottom-12 right-5 lg:right-12">
    <router-link to="/post/create" v-show="pathToDisplayButtons.includes(path)">
      <div
        class="flex bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-4 px-8 rounded-full shadow-lg"
      >
        <PencilBox :size="26" class="mr-1" />
        Write Post
      </div>
    </router-link>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import PencilBox from "vue-material-design-icons/PencilBox.vue";

const route = useRoute();

const pathToDisplayButtons = ["/"];

const path = computed(() => {
  return route.path;
});
</script>
