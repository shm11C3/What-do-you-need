<template>
  <div class="relative" ref="optionMenu">
    <button @click="showPostOptions">
      <DotsHorizontal />
    </button>
    <OptionMenuModal v-show="isShowPostOptions" @delete="deletePost" />
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import DotsHorizontal from "vue-material-design-icons/DotsHorizontal";
import OptionMenuModal from "@/components/parts/modals/OptionMenuModal.vue";

const isShowPostOptions = ref(false);
const optionMenu = ref(null);

// eslint-disable-next-line no-undef
const emit = defineEmits(["delete"]);

onMounted(() => {
  addEventListener("click", onClickOutside);
});
onBeforeUnmount(() => {
  removeEventListener("click", onClickOutside);
});

const deletePost = () => {
  emit("delete");
  isShowPostOptions.value = false;
};

const showPostOptions = () => {
  isShowPostOptions.value = true;
};

const onClickOutside = (e) => {
  if (e.target instanceof Node && !optionMenu.value?.contains(e.target)) {
    isShowPostOptions.value = false;
  }
};
</script>
