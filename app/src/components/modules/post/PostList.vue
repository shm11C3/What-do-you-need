<template>
  <div>
    <div v-for="(post, i) in props.posts" :key="post">
      <div class="rounded-lg bg-gray-50 border mt-4 shadow-lg">
        <div
          v-show="store.getters.username === post.username"
          class="flex flex-row-reverse mx-2"
        >
          <PostOptionMenuButton @delete="deletePost(i)" />
        </div>
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
            <div class="flex-auto mt-2 ml-1">
              <p class="text-md">@{{ post.username }}</p>
              <p class="truncate text-lg">{{ post.name }}</p>
            </div>
            <div class="flex ml-auto mr-2">
              <p class="mt-1 mr-2">
                <span class="text-sm"> from </span>
                <span class="text-lg">
                  {{
                    country_list.find((el) => el.code == posts[i].country_id)
                      .label
                  }}
                </span>
              </p>
              <!--CSSに`scale()`を設定するとヘッダーを貫通するので今はこのままのサイズで-->
              <!--TODO クソでかい国旗を縮小する-->
              <country-flag
                :country="
                  country_code_list.find((el) => el.code == posts[i].country_id)
                    .label
                "
                size="big"
              />
            </div>
          </div>
        </button>
        <button
          v-on:click="toDetail(post.ulid)"
          class="w-full text-left hover:bg-blue-50 pl-4 pt-3 pb-8"
        >
          <p class="text-xl pt-4 font-bold border-b-2 border-gray-300">
            {{ post.title }}
          </p>
          <PostImages
            :images="post.images"
            :enableShowDetail="false"
            class="mt-4"
          />
        </button>
      </div>
    </div>
    <div v-show="!posts.length && !isLoading">
      <div
        class="text-blue-800 bg-indigo-100 text-xl px-4 py-3 rounded-3xl shadow mt-4"
        role="alert"
      >
        <div>
          <p class="font-bold text-4xl">Welcome!!</p>
          <div class="mt-3">
            <p class="block sm:inline">
              Now, share with the world the help you need!
            </p>
          </div>
        </div>
        <div class="flex justify-end mt-5">
          <router-link
            to="/post/create"
            class="text-blue-800 bg-transparent border-2 border-blue-800 hover:border-blue-500 text-center text-xl px-4 py-2 rounded-full shadow-xl"
          >
            Create a post
          </router-link>
        </div>
      </div>
    </div>
    <div>
      <IntersectionObserver @observed="addPosts" :disableObserver="isLoading" />
    </div>
    <div v-show="isLoading || isDeleting">
      <LoadingSpinner :size="28" class="mt-4" />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import IntersectionObserver from "@/components/parts/IntersectionObserver.vue";
import LoadingSpinner from "@/components/parts/LoadingSpinner.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import CountryFlag from "vue-country-flag-next";
import country from "@/js/consts/county";
import PostImages from "@/components/templates/PostImages.vue";
import PostOptionMenuButton from "@/components/parts/buttons/PostOptionMenuButton.vue";
import postFetcher from "@/js/fetchers/postFetcher";

const router = useRouter();
const store = useStore();

const { country_code_list, country_list } = country();

// eslint-disable-next-line no-undef
const props = defineProps({
  posts: { type: Object },
  isLoading: { type: Boolean, default: false },
});

const isDeleting = ref(false);

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

/**
 * 投稿を削除する
 *
 * @param {integer} i
 */
const deletePost = async (i) => {
  isDeleting.value = true;
  const { deletePost } = postFetcher();

  const result = await deletePost(props.posts[i].ulid);

  isDeleting.value = false;

  // props / emitで受け渡している都合上、動的な更新をこのコンポーネントで実装するのはコストがかかるため、簡易的にロード処理を入れることで対処
  // [TODO]クソ実装を改め動的な更新を実装する
  if (result.status) {
    router.go({ path: router.currentRoute.path, force: true });
  }
};
</script>
