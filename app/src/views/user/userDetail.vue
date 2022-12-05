<template>
  <div>
    <div class="lg:flex justify-center" v-show="http_status == 200">
      <div class="lg:w-6/12">
        <UserCard
          v-show="!userIsLoading"
          class="mt-10"
          :showName="userProfile.name"
          :username="userProfile.username"
          :country_id="userProfile.country_id"
          :country_name="userProfile.country"
        ></UserCard>
        <PostList
          :posts="posts"
          :isLoading="postIsLoading"
          @addPosts="addPosts"
          class="mx-3"
        />
      </div>
    </div>
    <NotFound v-show="http_status == 404" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import UserCard from "@/components/modules/UserCard.vue";
import PostList from "@/components/modules/post/PostList.vue";
import NotFound from "../error/NotFound.vue";
import userFetcher from "@/js/fetchers/userFetcher";
import postFetcher from "@/js/fetchers/postFetcher";
import userValidator from "@/js/validators/userValidator";

const route = useRoute();

const userProfile = ref([]);
const posts = ref([]);
const nextPage = ref(1);
const postIsLoading = ref(false);
const userIsLoading = ref(true);
const error = ref([]);
const target = ref(""); // target of username
const http_status = ref(200);

const initial = () => {
  const { validationUsername } = userValidator();
  target.value = route.params.username;

  if (validationUsername(target.value).length) {
    // 不正なパラメータ
    http_status.value = 404;
    userIsLoading.value = false;
    postIsLoading.value = false;
    return;
  }

  getUserProfile();
  getPosts();
};

const getUserProfile = async () => {
  if (http_status.value == 404) {
    return;
  }
  const { fetchUserProfileByUsername } = userFetcher();

  try {
    const response = await fetchUserProfileByUsername(target.value);
    userProfile.value = response;
  } catch (e) {
    http_status.value = e.response.status;
    error.value = "An unexpected error has occurred.";
  }

  userIsLoading.value = false;
};

const getPosts = async () => {
  if (http_status.value == 404) {
    return;
  }
  const { fetchUserPosts } = postFetcher();

  postIsLoading.value = true;

  try {
    const response = await fetchUserPosts(target.value, nextPage.value, false);
    posts.value = JSON.parse(JSON.stringify(posts.value)).concat(
      response[0].data
    );

    nextPage.value = response[0].next_page_url
      ? response[0].current_page + 1
      : null;
  } catch (e) {
    http_status.value = e.response.status;
    error.value = "An unexpected error has occurred.";
  }

  postIsLoading.value = false;
};

const addPosts = () => {
  if (nextPage.value) {
    getPosts();
  }
};

initial();
</script>
