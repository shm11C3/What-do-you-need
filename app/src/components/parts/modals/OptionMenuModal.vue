<template>
  <div ref="optionMenuModal">
    <div
      class="absolute flex flex-col w-48 top-0 right-0 bg-white shadow-sm rounded-xl py-5"
    >
      <button class="flex hover:bg-gray-100 px-4 py-1">
        <PencilBox />
        Edit Post
      </button>
      <button
        @click="showDeleteModal"
        class="flex text-red-500 hover:bg-gray-100 px-4 py-1"
      >
        <Delete />
        Delete Post
      </button>
    </div>
    <PopUpModal
      v-show="showDeleteConfirm"
      iconType="warn"
      :cancelButton="false"
      message="This operation cannot be undone. Do you want to delete your submission?"
      positiveMessage="Delete"
      negativeMessage="Cancel"
      positiveColor="red"
      negativeColor="gray"
      @positive="deletePost"
      @negative="closeModal"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
import PencilBox from "vue-material-design-icons/PencilBox.vue";
import Delete from "vue-material-design-icons/Delete.vue";
import PopUpModal from "../PopUpModal.vue";

const optionMenuModal = ref(null);
const showDeleteConfirm = ref(false);

// eslint-disable-next-line no-undef
const emit = defineEmits(["delete"]);

const showDeleteModal = () => {
  showDeleteConfirm.value = true;
};

const deletePost = () => {
  showDeleteConfirm.value = false;
  emit("delete");
};

const closeModal = () => {
  showDeleteConfirm.value = false;
};
</script>
