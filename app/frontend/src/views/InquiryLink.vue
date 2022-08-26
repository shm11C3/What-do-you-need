<template>
  <div class="mt-4">
    <iframe :src="src" class="w-full h-screen">Loading…</iframe>
  </div>
</template>
<script setup>
const src = process.env.VUE_APP_INQUIRY_SRC;
</script>
