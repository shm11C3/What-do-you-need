<template>
  <div v-if="!email_verified">
    <section class="px-2 pt-32 bg-white md:px-0">
      <div
        class="container items-center max-w-6xl px-5 mx-auto space-y-6 text-center"
      >
        <h1
          class="text-lg tracking-tight font-sans font-extrabold tracking-tight text-left text-gray-900 w-auto sm:text-base md:text-2xl lg:md:text-4xl md:text-center"
        >
          <span class="block">
            <span
              :class="`block mt-1 text-${cssSetting.main} lg:inline lg:mt-0`"
              >Oops! </span
            >Your email has not yet been verified.
          </span>
        </h1>
        <p
          class="tracking-tight w-full font-sans w-auto mx-auto text-base text-left text-gray-500 md:max-w-md sm:text-lg lg:text-2xl md:max-w-3xl md:text-center"
        >
          Please check the email you sent to <br class="sm:hidden" />
          <span
            v-if="!isLoading"
            class="text-gray-700 bg-neutral-200 font-extrabold px-1"
            >{{ auth0User.email }}</span
          >
        </p>
      </div>
    </section>
  </div>
</template>
<script>
import { setting } from "../../js/setting/style";
import { useAuth0 } from "@auth0/auth0-vue";

export default {
  setup() {
    const auth0 = useAuth0();
    return {
      isLoading: auth0.isLoading,
      cssSetting: setting,
      auth0User: auth0.user,
    };
  },
  computed: {
    email_verified() {
      return this.$store.state.auth.email_verified;
    },
  },
};
</script>
