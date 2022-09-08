<template>
  <PostEditorVue @success="successSubmit" />
</template>
<script setup>
import PostEditorVue from "@/components/modules/post/PostEditor.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const successSubmit = (is_draft) => {
  if (!is_draft) {
    router.push(router.referrer);
  }
};
</script>
