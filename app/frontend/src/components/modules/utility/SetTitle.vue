<template>
  <div></div>
</template>
<script setup>
import { watch, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// TODO タイトルをユーザ名など動的URIに合わせて変えられるようにする

const title = computed(() => {
  return route.meta.title;
});

watch(title, (e) => {
  if (e === undefined) {
    e = "";
  } else {
    e = `- ${e}`;
  }
  document.title = `What do you need? ${e}`;
});
</script>
