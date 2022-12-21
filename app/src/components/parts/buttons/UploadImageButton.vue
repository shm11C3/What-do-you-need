<template>
  <label class="flex items-center ml-auto">
    <input
      :disabled="props.isDisable"
      class="hidden"
      type="file"
      accept=".jpg,.gif,.png,image/gif,image/jpeg,image/png"
      ref="input"
      @change="uploadFile"
    />
    <ImageOutline class="cursor-pointer" />
  </label>
</template>
<script setup>
import ImageOutline from "vue-material-design-icons/ImageOutline.vue";
import { ref } from "vue";

const input = ref(null);

// eslint-disable-next-line no-undef
const props = defineProps({
  isDisable: Boolean,
});

// eslint-disable-next-line no-undef
const emit = defineEmits(["selectedImage"]);

/**
 * ファイルを親コンポーネントへ受け渡す
 */
const uploadFile = () => {
  emit("selectImage", input.value.files[0] ?? null);
};
</script>
