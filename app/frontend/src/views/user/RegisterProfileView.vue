<template>
  <UserProfileForm @success="successRegister" :isRegister="true" />
</template>
<script>
import UserProfileForm from "@/components/form/UserProfileForm.vue";
import router from "@/router";

export default {
  name: "RegisterUserProfile",

  components: {
    UserProfileForm,
  },

  setup() {
    const successRegister = () => {
      router.push("/user/profile");
    };

    return {
      successRegister,
    };
  },
};
</script>
