<template>
  <div>
    <div v-for="post in props.posts" :key="post">
      <div class="rounded-lg bg-gray-50 border mt-4 shadow-lg">
        <button
          @click="toUser(post.username)"
          class="w-full text-left hover:bg-blue-50 pl-4"
        >
          <div class="flex my-2">
            <img
              class="rounded-full"
              width="60"
              :src="post.profile_img_uri ?? store.getters.defaultUserUri"
            />
            <div class="mt-2 ml-1">
              <p class="text-md">@{{ post.username }}</p>
              <p class="truncate text-lg">{{ post.name }}</p>
            </div>
          </div>
        </button>
        <button
          v-on:click="toDetail(post.ulid)"
          class="w-full text-left hover:bg-blue-50 pl-4"
        >
          <p class="text-xl pt-4 font-bold border-b-2 border-gray-300">
            {{ post.title }}
          </p>
          <p class="h-16 truncate">{{ post.content }}</p>
        </button>
      </div>
    </div>
    <div>
      <IntersectionObserver @observed="addPosts" :disableObserver="isLoading" />
    </div>
    <div v-show="isLoading">
      <LoadingSpinner :size="28" class="mt-4" />
    </div>
  </div>
</template>
<script setup>
import IntersectionObserver from "@/components/parts/IntersectionObserver.vue";
import LoadingSpinner from "@/components/parts/LoadingSpinner.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

// eslint-disable-next-line no-undef
const props = defineProps({
  posts: { type: Object },
  isLoading: { type: Boolean, default: false },
});

// eslint-disable-next-line no-undef
const emit = defineEmits(["addPosts"]);

const addPosts = () => {
  emit("addPosts");
};

const toDetail = (ulid) => {
  router.push(`/post/${ulid}`);
};

const toUser = (username) => {
  router.push(`/user/detail/${username}`);
};
</script>
