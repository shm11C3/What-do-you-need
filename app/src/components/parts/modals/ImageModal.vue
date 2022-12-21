<template>
  <div
    v-show="active"
    class="fixed top-0 left-0 z-80 w-screen h-screen bg-black/70 flex justify-center items-center"
  >
    <a
      class="fixed z-10000 top-6 right-8 text-white text-5xl font-bold cursor-pointer"
      @click="closeModal()"
      >&times;</a
    >

    <!-- A big image will be displayed here -->
    <img :src="props.imgSrc" class="max-w-[800px] max-h-[600px] object-cover" />
  </div>
</template>
<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({
  active: Boolean,
  imgSrc: String,
});

// eslint-disable-next-line no-undef
const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  emit("closeModal");
};
</script>
