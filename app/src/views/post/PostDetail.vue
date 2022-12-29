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
                width="60"
                :src="post.profile_img_uri ?? store.getters.defaultUserUri"
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
            <postImages
              :images="post.images"
              :enableShowDetail="true"
              @activeModal="activeModal"
              class="mt-4"
            />
            <vue-markdown-it class="md-container my-6" :source="post.content" />
          </div>
          <div class="flex flex-auto w-full">
            <div class="relative group w-full">
              <span
                class="whitespace-nowrap rounded bg-black px-2 py-1 text-white absolute -top-12 left-1/2 -translate-x-1/2 before:content-[''] before:absolute before:-translate-x-1/2 before:left-1/2 before:top-full before:border-4 before:border-transparent before:border-t-black opacity-0 group-hover:opacity-100 transition pointer-events-none"
                >Coming Soon!</span
              >
              <button
                class="flex justify-center hover:bg-gray-200 py-2 w-full"
                disabled
              >
                <CommentTextOutline />
              </button>
            </div>
            <div
              v-show="!hideBottomButtons"
              ref="reactionModal"
              class="relative group w-full"
            >
              <span
                class="whitespace-nowrap rounded bg-black px-2 py-1 text-white absolute -top-12 left-1/2 -translate-x-1/2 before:content-[''] before:absolute before:-translate-x-1/2 before:left-1/2 before:top-full before:border-4 before:border-transparent before:border-t-black opacity-0 group-hover:opacity-100 transition pointer-events-none"
                >React to this post!</span
              >
              <span
                v-show="showReactionModal"
                class="whitespace-nowrap rounded bg-white px-2 py-1 absolute -top-14 shadow-lg border-2"
              >
                <div
                  v-show="store.getters.isAuthenticated"
                  v-for="(reaction_type, i) in reaction_types"
                  :key="reaction_type"
                  class="float-left"
                >
                  <button
                    @click="sendReaction(i)"
                    class="px-1"
                    :disabled="isSendingReaction"
                    :class="
                      checkValueExists(post.usersReactions ?? [], i)
                        ? 'bg-gray-200'
                        : ''
                    "
                  >
                    <span :class="reaction_type === '❤' ? 'text-red-500' : ''">
                      {{ reaction_type }}
                    </span>
                  </button>
                </div>
                <div v-show="!store.getters.isAuthenticated">
                  <router-link
                    to="/login"
                    class="bg-blue-500 hover:bg-blue-400 text-white rounded px-4 py-2 w-full"
                  >
                    Login
                  </router-link>
                </div>
              </span>
              <button
                @click="showReactionModal = !showReactionModal"
                class="flex justify-center hover:bg-gray-200 py-2 w-full"
              >
                <HeartPlusOutline v-show="!isUserAddedReaction" />
                <Heart v-show="isUserAddedReaction" fillColor="red" />
                <span>{{ post.totalReactionCount }}</span>
              </button>
            </div>
            <div class="relative group w-full">
              <span
                class="whitespace-nowrap rounded bg-black px-2 py-1 text-white absolute -top-12 left-1/2 -translate-x-1/2 before:content-[''] before:absolute before:-translate-x-1/2 before:left-1/2 before:top-full before:border-4 before:border-transparent before:border-t-black opacity-0 group-hover:opacity-100 transition pointer-events-none"
                >Coming Soon!</span
              >
              <button class="flex justify-center hover:bg-gray-200 py-2 w-full">
                <ShareVariant />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LoadingSpinner :size="28" v-show="isLoading" />
    <NotFound v-show="http_status == 404" />
  </div>
</template>
<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from "vue";
import postFetcher from "@/js/fetchers/postFetcher";
import reactionFetcher from "@/js/fetchers/reactionFetcher";
import helper from "@/js/helpers/helper";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import LoadingSpinner from "@/components/parts/LoadingSpinner.vue";
import VueMarkdownIt from "vue3-markdown-it";
import NotFound from "../error/NotFound.vue";
import HeartPlusOutline from "vue-material-design-icons/HeartPlusOutline.vue";
import Heart from "vue-material-design-icons/Heart.vue";
import CommentTextOutline from "vue-material-design-icons/CommentTextOutline.vue";
import ShareVariant from "vue-material-design-icons/ShareVariant.vue";
import reactionType from "@/js/consts/reactionType";
import PostImages from "@/components/templates/PostImages.vue";

const route = useRoute();
const router = useRouter();
const { isUlid } = helper();
const post = ref([]);
const isLoading = ref(false);
const error = ref([]);
const http_status = ref(200);
const showReactionModal = ref(false);
const reactionModal = ref(null);
const isSendingReaction = ref(false);

const hideBottomButtons = ref(false); // ボタンがモーダルを貫通してくるので暫定対策で隠す

const isUserAddedReaction = computed(() => {
  return Object.values(post.value.usersReactions ?? []).length;
});

const { reaction_types } = reactionType();

const store = useStore();

// 画面の範囲外をクリックした際にリアクションモーダルを閉じる
onMounted(() => {
  addEventListener("click", onClickOutside);
});
onBeforeUnmount(() => {
  removeEventListener("click", onClickOutside);
});

const activeModal = (status) => {
  hideBottomButtons.value = status;
};

/**
 * リアクションモーダルを閉じる
 *
 * @param {MouseEvent} e
 */
const onClickOutside = (e) => {
  if (e.target instanceof Node && !reactionModal.value?.contains(e.target)) {
    showReactionModal.value = false;
  }
};

const sendReaction = async (reaction_type) => {
  isSendingReaction.value = true;
  showReactionModal.value = false;

  const { addReaction, removeReaction } = reactionFetcher();

  const old_post = JSON.parse(JSON.stringify(post.value)); // post.valueをデータ更新前に値渡しさせる

  let response = [];
  if (checkValueExists(post.value.usersReactions, reaction_type)) {
    // リアクション解除

    // 楽観的更新
    post.value.totalReactionCount--;
    post.value.usersReactions[
      Object.keys(post.value.usersReactions).find(
        (key) => post.value.usersReactions[key] === reaction_type
      )
    ] = null;
    post.value.countByReactionType[reaction_type]--;

    // APIに送信
    try {
      const target_reaction = post.value.reactions.find(
        (e) =>
          e.reaction_type === reaction_type &&
          e.auth_id === store.getters.auth_id
      );
      response = await removeReaction(target_reaction.ulid);
    } catch (e) {
      response.status = false;
      isSendingReaction.value = false;
    }
  } else {
    // リアクション付与

    // 楽観的更新
    post.value.totalReactionCount++;
    post.value.usersReactions[Object.keys(post.value.usersReactions).length] =
      reaction_type;
    post.value.countByReactionType[reaction_type]++;

    // APIに送信
    try {
      response = await addReaction(post.value.ulid, reaction_type);
    } catch (e) {
      response.status = false;
      isSendingReaction.value = false;
    }
  }

  // エラー時に楽観的更新を切り戻す
  if (!response.status) {
    post.value = old_post;
  }

  isSendingReaction.value = false;
};

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

const checkValueExists = (obj, value) => {
  return Object.values(obj).includes(value);
};

initial();
</script>
