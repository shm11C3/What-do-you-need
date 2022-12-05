<template>
  <div v-show="fulfilled">
    <section class="px-2 pt-32 bg-white md:px-0">
      <div
        class="container items-center max-w-6xl px-5 mx-auto space-y-6 text-center"
      >
        <h1
          class="text-lg tracking-tight font-sans font-extrabold tracking-tight text-left text-gray-900 w-auto sm:text-base md:text-2xl lg:md:text-4xl md:text-center"
        >
          We have sent a password reset email to your email
        </h1>
        <p
          class="tracking-tight w-full font-sans w-auto mx-auto text-base text-left text-gray-500 md:max-w-md sm:text-lg lg:text-2xl md:max-w-3xl md:text-center"
        >
          Please check the email you sent to <br class="sm:hidden" />
          <span class="text-gray-700 bg-neutral-200 font-extrabold px-1">{{
            auth0.user.email
          }}</span>
        </p>
      </div>
    </section>
  </div>
  <div v-show="!fulfilled && !error">
    <LoadingSpinner class="mt-20" />
  </div>
  <div v-show="error" class="flex lg:justify-center">
    <AlertIndicate
      class="mt-10 mx-2 w-full lg:w-1/2"
      theme="danger"
      :showSummary="false"
      :message="error"
    ></AlertIndicate>
  </div>
</template>
<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
import { useStore } from "vuex";
import userFetcher from "@/js/fetchers/userFetcher";
import { watch, computed, ref } from "vue";
import LoadingSpinner from "../../components/parts/LoadingSpinner.vue";
import AlertIndicate from "../../components/parts/AlertIndicate.vue";

const store = useStore();

const auth0 = ref(useAuth0());
const fulfilled = ref(false);
const error = ref(null);

/**
 * パスワードリセットリクエストを送信
 */
const request = async () => {
  const { requestPasswordReset } = userFetcher();
  try {
    const response = await requestPasswordReset();
    fulfilled.value = response.data.status;
  } catch (e) {
    fulfilled.value = false;
    error.value = e.message;
  }
};

const idTokenClaims = computed(() => {
  return store.getters.idTokenClaims;
});

if (idTokenClaims.value) {
  request();
}

watch(idTokenClaims, (e) => {
  if (e) {
    request();
  }
});
</script>
