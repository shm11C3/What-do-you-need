<template>
  <div class="lg:flex justify-center">
    <div class="lg:w-6/12">
      <UserCard
        class="mt-10"
        :showName="userProfile.name"
        :username="userProfile.username"
        :country_id="userProfile.country_id"
        :country_name="userProfile.country"
      ></UserCard>
      <UserButton
        class="mt-8"
        v-on:clickButton="changeDisplay"
        :isOwner="true"
        :active="activeDisplay"
      ></UserButton>
      <div v-show="activeDisplay == 0">
        <PostList
          :posts="posts"
          :isLoading="isLoading"
          @addPosts="addPosts"
          class="mx-3"
        />
      </div>
      <div v-show="activeDisplay == 1">
        <UserProfileForm @success="successUpdate"></UserProfileForm>
      </div>
      <div v-show="activeDisplay == 2">
        <UserSetting></UserSetting>
      </div>
    </div>
  </div>
</template>
<script setup>
import UserCard from "@/components/modules/UserCard.vue";
import UserButton from "@/components/modules/UserButton.vue";
import PostList from "@/components/modules/post/PostList.vue";
import UserProfileForm from "@/components/form/UserProfileForm.vue";
import UserSetting from "@/components/modules/UserSetting.vue";
import postFetcher from "@/js/fetchers/postFetcher";
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

const activeDisplay = ref(0);
const showSuccessAlert = ref(false);
const isLoading = ref(false);
const posts = ref([]);
const nextPage = ref(1);
const error = ref([]);

const userProfile = computed(() => {
  return store.state.auth.userProfile;
});

// URIのフラグメント
const fragment = computed(() => {
  return route.hash;
});

const changeDisplay = (buttonNumber) => {
  activeDisplay.value = buttonNumber;
};

const successUpdate = () => {
  showSuccessAlert.value = true;
  activeDisplay.value = 0;
};

/**
 * URIのフラグメントから該当のタブに変更させる
 *
 * @param {string} fragment
 */
const changeTabFromFragment = (fragment) => {
  const tabList = {
    "#posts": 0,
    "#edit": 1,
    "#setting": 2,
  };

  if (!fragment || tabList[fragment] == undefined) {
    changeDisplay(0);
  } else {
    changeDisplay(tabList[fragment]);
  }
};

// URLフラグメントの変更を検知しタブを切り替える
watch(fragment, (e) => {
  changeTabFromFragment(e);
});

changeTabFromFragment(fragment.value);

// watch id_token in store
watch(
  computed(() => {
    return store.getters.idTokenClaims;
  }),
  () => {
    getPosts();
  }
);

const getPosts = async () => {
  const { fetchUserPosts } = postFetcher();

  isLoading.value = true;

  try {
    const response = await fetchUserPosts(
      store.getters.userProfile.username,
      nextPage.value
    );
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
