<template>
  <img class="object-contain max-h-96" v-lazy="props.imgSrc" />
</template>
<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({
  imgSrc: String,
});
</script>
