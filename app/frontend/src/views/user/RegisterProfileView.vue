<template>
  <div class="lg:flex justify-center">
    <div class="lg:w-6/12">
      <UserProfileForm @success="successRegister" :isRegister="true" />
    </div>
  </div>
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
