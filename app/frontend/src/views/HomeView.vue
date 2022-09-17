<template>
  <div class="lg:flex justify-center my-10 px-2">
    <PostList
      class="lg:w-6/12"
      :posts="posts"
      :isLoading="isLoading"
      @addPosts="addPosts"
    />
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import PostList from "@/components/modules/post/PostList.vue";
import postFetcher from "@/js/fetchers/postFetcher";
import { useStore } from "vuex";

const store = useStore();

const nextPage = ref(1);
const posts = ref([]);
const error = ref([]);
const isLoading = ref(false);

const idTokenClaims = computed(() => {
  return store.getters.idTokenClaims;
});

onMounted(() => {
  // 認証していない場合はそのまま投稿リストを取得、認証済みの場合はidTokenの取得をした後にpostを取得
  if (!store.getters.isAuthenticated) {
    getPosts();
  }
});

watch(idTokenClaims, () => {
  getPosts();
});

const getPosts = async () => {
  const { fetchPosts } = postFetcher();

  isLoading.value = true;

  try {
    const response = await fetchPosts(nextPage.value);
    posts.value = JSON.parse(JSON.stringify(posts.value)).concat(
      response[0].data
    );

    nextPage.value = response[0].next_page_url
      ? response[0].current_page + 1
      : null;
  } catch (e) {
    error.value = "An unexpected error has occurred.";
  }

  isLoading.value = false;
};

const addPosts = () => {
  if (nextPage.value) {
    getPosts();
  }
};
</script>
