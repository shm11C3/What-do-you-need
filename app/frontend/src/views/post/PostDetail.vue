<template>
  <div>
    <div class="lg:flex justify-center my-10 px-2">
      <div v-show="!isLoading && http_status == 200" class="lg:w-6/12">
        <div class="rounded-lg bg-gray-50 border mt-4 shadow-lg">
          <span
            class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-1"
            >{{ post.category_name }}</span
          >
          <button
            @click="toUser(post.username)"
            class="w-full text-left hover:bg-blue-50 pl-4"
          >
            <div class="flex my-2">
              <img
                class="rounded-full"
                src="https://via.placeholder.com/60x60x/"
              />
              <div class="mt-2 ml-1">
                <p class="text-md">@{{ post.username }}</p>
                <p class="h-auto text-lg">{{ post.name }}</p>
              </div>
            </div>
          </button>
          <div class="w-full text-left pl-4">
            <p class="text-xl pt-4 font-bold border-b-2 border-gray-300">
              {{ post.title }}
            </p>
            <vue-markdown-it class="md-container my-6" :source="post.content" />
          </div>
        </div>
      </div>
    </div>
    <LoadingSpinner :size="28" v-show="isLoading" />
    <NotFound v-show="http_status == 404" />
  </div>
</template>
<script setup>
import { ref, watch, computed } from "vue";
import postFetcher from "@/js/fetchers/postFetcher";
import helper from "@/js/helpers/helper";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import LoadingSpinner from "@/components/parts/LoadingSpinner.vue";
import VueMarkdownIt from "vue3-markdown-it";
import NotFound from "../error/NotFound.vue";

const route = useRoute();
const router = useRouter();
const { isUlid } = helper();
const post = ref([]);
const isLoading = ref(false);
const error = ref([]);
const http_status = ref(200);

const store = useStore();

const toUser = (username) => {
  router.push(`/user/detail/${username}`);
};

// watch id_token in store
watch(
  computed(() => {
    return store.getters.idTokenClaims;
  }),
  () => {
    getPost();
  }
);

const initial = () => {
  isLoading.value = true;

  if (!isUlid(route.params.ulid)) {
    // show 404
    http_status.value = 404;
    isLoading.value = false;
    return;
  }

  if (!store.getters.isAuthenticated || store.getters.idTokenClaims) {
    getPost();
  }
};

const getPost = async () => {
  const { fetchPost } = postFetcher();

  try {
    const response = await fetchPost(route.params.ulid);
    post.value = response[0];
  } catch (e) {
    http_status.value = e.response.status;
    error.value = "An unexpected error has occurred.";
  }

  isLoading.value = false;
};

initial();
</script>
