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
        <PostList></PostList>
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
<script>
import UserCard from "@/components/modules/UserCard.vue";
import UserButton from "@/components/modules/UserButton.vue";
import PostList from "@/components/modules/post/PostList.vue";
import UserProfileForm from "@/components/form/UserProfileForm.vue";
import UserSetting from "@/components/modules/UserSetting.vue";
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "UserProfile",

  components: {
    UserCard,
    UserButton,
    PostList,
    UserSetting,
    UserProfileForm,
  },

  setup() {
    const store = useStore();
    const route = useRoute();

    const activeDisplay = ref(0);
    const showSuccessAlert = ref(false);

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

    return {
      changeDisplay,
      successUpdate,
      activeDisplay,
      showSuccessAlert,
      userProfile,
    };
  },
};
</script>
