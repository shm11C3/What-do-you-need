<template>
  <div class="flex flex-wrap">
    <div
      :class="props.images.length > 1 ? 'w-1/2' : 'w-full'"
      v-for="(image, i) in props.images"
      :key="image"
    >
      <button
        v-if="props.enableDelete"
        @click="deleteImage(image.uuid)"
        class="absolute right-0 bg-gray-50 bg-opacity-50 rounded-full"
      >
        <Close />
      </button>
      <button v-if="props.enableShowDetail" @click="showDetail(i)">
        <PostImage :imgSrc="`${root_image}posts/${image.uuid}.jpg`" />
      </button>
      <PostImage v-else :imgSrc="`${root_image}posts/${image.uuid}.jpg`" />
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
import Close from "vue-material-design-icons/Close.vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  enableShowDetail: Boolean,
  enableDelete: { type: Boolean, default: false },
  images: Object,
});

// eslint-disable-next-line no-undef
const emit = defineEmits(["activeModal", "deleteImage"]);

const isActive = ref([false, false, false, false]);

const showDetail = (i) => {
  isActive.value[i] = true;
  emit("activeModal", true);
};

const closeModal = (i) => {
  isActive.value[i] = false;
  emit("activeModal", false);
};

const deleteImage = (uuid) => {
  emit("deleteImage", uuid);
};

const root_image = process.env.VUE_APP_ROOT_IMG;
</script>
