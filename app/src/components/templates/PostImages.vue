<template>
  <div class="flex flex-wrap">
    <div
      :class="props.images.length > 1 ? 'w-1/2' : 'w-full'"
      v-for="(image, i) in props.images"
      :key="image"
    >
      <button @click="showDetail(i)">
        <PostImage :imgSrc="`${root_image}posts/${image.uuid}.jpg`" />
      </button>
      <ImageModal
        v-if="props.enableShowDetail"
        :active="isActive[i]"
        :imgSrc="`${root_image}posts/${image.uuid}.jpg`"
        @closeModal="closeModal(i)"
      />
    </div>
  </div>
</template>
<script setup>
import PostImage from "@/components/parts/PostImage.vue";
import ImageModal from "@/components/parts/modals/ImageModal.vue";
import { ref } from "vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  enableShowDetail: Boolean,
  images: Object,
});

// eslint-disable-next-line no-undef
const emit = defineEmits(["activeModal"]);

const isActive = ref([false, false, false, false]);

const showDetail = (i) => {
  isActive.value[i] = true;
  emit("activeModal", true);
};

const closeModal = (i) => {
  isActive.value[i] = false;
  emit("activeModal", false);
};

const root_image = process.env.VUE_APP_ROOT_IMG;
</script>
