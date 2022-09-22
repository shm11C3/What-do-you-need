<template>
  <div v-if="!email_verified">
    <section class="px-2 pt-32 bg-white md:px-0">
      <div class="container max-w-6xl px-5 mx-auto space-y-6 text-left">
        <h1
          class="text-lg font-sans font-extrabold tracking-tight text-left text-gray-900 w-auto sm:text-base md:text-2xl lg:md:text-4xl md:text-center"
        >
          <span class="block">
            <span
              :class="`block mt-1 text-${cssSetting.main} lg:inline lg:mt-0`"
              >Oops! </span
            >Your email has not yet been verified.
          </span>
        </h1>
        <p
          class="tracking-tight w-auto font-sans mx-auto text-base text-left text-gray-500 md:max-w-3xl sm:text-lg lg:text-2xl md:text-center"
        >
          Please check the email you sent to <br class="sm:hidden" />
          <span
            v-if="!isLoading && auth0User"
            class="text-gray-700 bg-neutral-200 font-extrabold px-1"
            >{{ auth0User.email }}</span
          >
        </p>
        <div class="flex flex-row-reverse">
          <div class="mt-10">
            <label class="mr-2 text-lg text-gray-700"
              >Have you not received a verification email?</label
            >
            <button
              v-on:disabled="isProcessingSendEmail"
              @click="resendVerificationEmail"
              class="bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white border border-blue-500 hover:border-transparent font-bold py-2 px-4 rounded-full"
            >
              Resend verification email
            </button>
            <LoadingSpinner :size="28" v-show="isProcessingSendEmail" />
            <AlertIndicate
              v-show="isSuccessSendEmail"
              class="my-2"
              theme="info"
              :showSummary="false"
              message="Email successfully sent!!"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { ref } from "vue";
import { setting } from "../../js/setting/style";
import { useAuth0 } from "@auth0/auth0-vue";
import { useRouter } from "vue-router";
import { watch } from "vue";
import userFetcher from "@/js/fetchers/userFetcher";
import AlertIndicate from "@/components/parts/AlertIndicate.vue";
import LoadingSpinner from "@/components/parts/LoadingSpinner.vue";

export default {
  components: {
    AlertIndicate,
    LoadingSpinner,
  },

  setup() {
    const auth0 = useAuth0();
    const router = useRouter();
    const error = ref([]);
    const isProcessingSendEmail = ref(false);
    const isSuccessSendEmail = ref(false);

    watch(auth0, () => {
      if (auth0.user && auth0.user.email_verified) {
        router.push("login");
      }
    });

    const resendVerificationEmail = async () => {
      isProcessingSendEmail.value = true;
      isSuccessSendEmail.value = false;
      const { postResendVerificationEmailRequest } = userFetcher();

      try {
        const response = await postResendVerificationEmailRequest();
        isSuccessSendEmail.value = response.data.status;
      } catch (e) {
        error.value = e;
      }

      isProcessingSendEmail.value = false;
    };

    return {
      isLoading: auth0.isLoading,
      cssSetting: setting,
      auth0User: auth0.user,
      isProcessingSendEmail,
      isSuccessSendEmail,
      resendVerificationEmail,
    };
  },
  computed: {
    email_verified() {
      return this.$store.state.auth.email_verified;
    },
  },
};
</script>
