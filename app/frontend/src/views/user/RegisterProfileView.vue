<template>
  <div>
    <div v-if="!userProfile" class="lg:flex justify-center">
      <div class="lg:w-6/12">
        <UserProfileForm @success="successRegister" :isRegister="true" />
      </div>
    </div>
    <div v-else>
      <NotFound />
    </div>
  </div>
</template>
<script>
import UserProfileForm from "@/components/form/UserProfileForm.vue";
import router from "@/router";
import { useStore } from "vuex";
import NotFound from "../error/NotFound.vue";

export default {
  name: "RegisterUserProfile",

  components: {
    UserProfileForm,
    NotFound,
  },

  setup() {
    const store = useStore();

    const userProfile = store.getters.userProfile;

    const successRegister = () => {
      router.push("/user/profile");
    };

    return {
      successRegister,
      userProfile,
    };
  },
};
</script>
