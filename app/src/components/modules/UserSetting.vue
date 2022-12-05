<template>
  <div class="mx-3">
    <div class="shadow-xl rounded-lg">
      <button
        class="flex items-center h-14 w-full hover:bg-gray-100 hover:text-blue-900 mt-8 rounded-t-lg"
        @click="logout"
      >
        <Logout class="mx-2"></Logout>
        <p class="text-xl">Logout</p>
      </button>
      <button
        class="flex items-center h-14 w-full hover:bg-gray-100 hover:text-blue-900"
        @click="beginMfaConfig"
      >
        <TwoFactorAuthentication class="mx-2" />
        <p class="text-xl">Multi Factor Auth</p>
        <div class="ml-auto mr-2">
          <div v-show="isLoading" class="flex justify-center">
            <div class="animate-ping h-1 w-1 bg-blue-500 rounded-full"></div>
            <div
              class="animate-ping h-1 w-1 bg-blue-500 rounded-full mx-1"
            ></div>
            <div class="animate-ping h-1 w-1 bg-blue-500 rounded-full"></div>
          </div>
          <div v-show="!isLoading" class="flex items-center">
            <span
              :class="isEnabledMfa ? 'bg-teal-400' : 'bg-gray-300'"
              class="p-1 h-1 w-1 rounded-full"
            ></span>
            <p class="ml-1">{{ isEnabledMfa ? "Enabled" : "Disabled" }}</p>
          </div>
        </div>
      </button>
      <div v-show="!isSocialLogin">
        <router-link
          class="flex items-center h-14 w-full hover:bg-gray-100 hover:text-blue-900"
          to="/user/setting/password"
        >
          <AccountKey class="mx-2"></AccountKey>
          <p class="text-xl">Change Your Password</p>
        </router-link>
      </div>
      <router-link
        to="/user/setting/delete-account"
        class="flex items-center h-14 w-full hover:bg-gray-100 text-red-500 hover:text-pink-700"
      >
        <AccountRemove class="mx-2" />
        <p class="text-xl">Delete Your Account</p>
      </router-link>
      <div class="flex items-center h-14 w-full rounded-b-lg">
        <AccountClock class="mx-2 svg-reversal" />
        <p class="text-xl">
          Registration Date:
          <span class="text-gray-500 text-lg">{{ registrationDate }}</span>
        </p>
      </div>
    </div>
    <div class="shadow-xl rounded-lg mb-10">
      <button
        class="flex items-center h-14 w-full hover:bg-gray-100 hover:text-blue-900 mt-4 rounded-t-lg"
      >
        <p class="text-xl ml-2">Our Privacy Policy</p>
      </button>
      <button
        class="flex items-center h-14 w-full hover:bg-gray-100 hover:text-blue-900"
      >
        <p class="text-xl ml-2">Terms of Service</p>
      </button>
      <router-link
        class="flex items-center h-14 w-full hover:bg-gray-100 hover:text-blue-900"
        to="/sources"
      >
        <p class="text-xl ml-2">Application Source Codes</p>
      </router-link>
      <router-link
        to="/contact-as"
        class="flex items-center h-14 w-full hover:bg-gray-100 hover:text-blue-900 rounded-b-lg"
      >
        <p class="text-xl ml-2">Contact As</p>
      </router-link>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useAuth0 } from "@auth0/auth0-vue";
import userFetcher from "@/js/fetchers/userFetcher";
import Logout from "vue-material-design-icons/Logout.vue";
import AccountKey from "vue-material-design-icons/AccountKey.vue";
import AccountRemove from "vue-material-design-icons/AccountRemove.vue";
import AccountClock from "vue-material-design-icons/AccountClock.vue";
import TwoFactorAuthentication from "vue-material-design-icons/TwoFactorAuthentication.vue";

const store = useStore();
const router = useRouter();
const auth0 = useAuth0();

const auth0UserInfo = ref();
const isEnabledMfa = ref(false);
const isLoading = ref(false);

const { postMfaConfig, fetchAccountInfo } = userFetcher();

let registrationDate;
const created_at = store.getters.userProfile.created_at;
const auth_type = store.getters.userProfile.auth_id.split("|")[0];

const isSocialLogin = auth_type != "auth0";

if (!created_at) {
  registrationDate = "No Data";
} else {
  registrationDate = created_at.split(" ")[0];
}

const logout = () => {
  router.push("/logout");
};

/**
 * Auth0のログイン中のアカウントデータを取得し、値に代入
 */
const setAccountInfo = async () => {
  auth0UserInfo.value = await fetchAccountInfo();
  isEnabledMfa.value = auth0UserInfo.value.user_metadata.use_mfa;
};

/**
 * MFAの設定を開始
 */
const beginMfaConfig = async () => {
  isLoading.value = true;
  const response = await postMfaConfig(!isEnabledMfa.value);

  // 設定を有効にした場合
  if (response.result) {
    auth0.loginWithRedirect({
      redirect_uri: process.env.VUE_APP_REDIRECT_URL + "login",
    });
  }

  isEnabledMfa.value = response.result;
  isLoading.value = false;
};

// ID Tokenがvuexに登録された段階でgetAccountInfoを呼び出す
watch(
  computed(() => {
    return store.getters.idTokenClaims;
  }),
  () => {
    setAccountInfo();
  }
);

if (store.getters.idTokenClaims) {
  setAccountInfo();
}
</script>
<style>
.leading-14 {
  line-height: 14px;
}
.svg-reversal {
  transform: scale(-1, 1);
}
</style>
