<template>
  <div class="p-3">
    <div class="from-group">
      <form @submit.prevent="submit">
        <div v-if="isRegister">
          <h2 class="text-4xl font-bold text-center">Register Profile</h2>
          <h3 class="mt-2 text-xl text-center">Please enter your profile</h3>
        </div>
        <!--プロフィール画像-->
        <div class="mb-4 px-2 w-full">
          <label class="block mb-1 text-sm" for="name">Name</label>

          <input
            v-model="name"
            class="w-full border px-4 py-2 rounded-lg focus:border-blue-500 focus:shadow-outline outline-none"
            type="text"
            autofocus
            placeholder="Name..."
          />
          <p class="text-gray-600 text-xs italic">
            This name will be public to all users. Nicknames are also possible.
          </p>
          <div v-if="showNameError">
            <div v-for="error in nameValidationErrors" :key="error">
              <p class="text-red-600">{{ error }}</p>
            </div>
          </div>
        </div>
        <div class="mb-4 px-2 w-full">
          <label class="block mb-1 text-sm" for="username">Username</label>
          <div class="flex">
            <span
              class="inline-flex items-center px-3 w-10 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300"
            >
              <div v-if="duplicateUsername_isLoading">
                <svg
                  class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
              <div v-else>@</div>
            </span>

            <input
              v-model="username"
              @focus="usernameIsFocus = true"
              @blur="usernameIsFocus = false"
              class="rounded-none rounded-r-lg border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 focus:shadow-outline outline-none block flex-1 min-w-0 w-full p-2.5"
              type="text"
              placeholder="Username..."
              autocomplete="off"
            />
          </div>
          <p class="text-gray-600 text-xs italic">
            User name is a unique name for identification.
          </p>
          <div v-if="showUsernameError">
            <div v-for="error in usernameValidationErrors" :key="error">
              <p class="text-red-600">{{ error }}</p>
            </div>
            <p class="text-red-600">{{ duplicateUsernameError }}</p>
          </div>
          <div class="mt-2 w-full">
            <label class="block mb-1 text-sm">Country : </label>

            <v-select :options="countries" v-model="selected_country">
            </v-select>
            <div v-if="showCountryError">
              <div v-for="error in countryValidationErrors" :key="error">
                <p class="text-red-600">{{ error }}</p>
              </div>
            </div>
          </div>
          <div v-for="error in errors" :key="error">
            <AlertIndicate
              class="mt-2"
              theme="danger"
              :showSummary="false"
              :message="error[0]"
            ></AlertIndicate>
          </div>
          <div class="flex flex-row-reverse mt-4">
            <button
              v-bind:disabled="isLoading"
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:w-full lg:w-auto shadow"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import country from "../../js/consts/county";
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
import userFetcher from "@/js/fetchers/userFetcher";
import userValidator from "@/js/validators/userValidator";
import AlertIndicate from "../parts/AlertIndicate.vue";

export default {
  name: "userProfileForm",

  props: {
    isRegister: { type: Boolean, default: false },
  },

  components: {
    vSelect,
    AlertIndicate,
  },

  setup(props, context) {
    const { country_list } = country();
    const store = useStore();
    const { validationName, validationUsername, validationCountry } =
      userValidator();

    /**
     * Constants
     */
    const name = ref("");
    const username = ref("");
    const selected_country = ref("");
    const errors = ref("");
    const usernameIsFocus = ref(false);
    const showNameError = ref(false);
    const showUsernameError = ref(false);
    const showCountryError = ref(false);
    const isLoading = ref(false);
    const duplicateUsername_isLoading = ref(false);
    const duplicateUsernameError = ref("");
    const countries = country_list;

    /**
     * computed
     */
    const country_id = computed(() => {
      if (!selected_country.value) {
        return null;
      }
      return selected_country.value.code;
    });

    const nameValidationErrors = computed(() => {
      return validationName(name.value);
    });

    const usernameValidationErrors = computed(() => {
      return validationUsername(username.value);
    });

    const countryValidationErrors = computed(() => {
      return validationCountry(country_id.value);
    });

    /**
     * フォーム内すべての入力が有効な場合 True を返す
     *
     * @return {bool}
     */
    const formIsAllValid = computed(() => {
      return !(
        nameValidationErrors.value.length +
        countryValidationErrors.value.length +
        usernameValidationErrors.value.length +
        duplicateUsernameError.value.length
      );
    });

    /**
     * watch
     */
    watch([name, username, country_id], () => {
      storeFromData();
    });

    /**
     * ユーザー名の重複を取得しエラーを吐く
     */
    watch(usernameIsFocus, async () => {
      // `username`がフォーカスされている場合発動させない
      if (usernameIsFocus.value) {
        return;
      }

      if (
        !props.isRegister &&
        username.value == store.getters.userProfile.username
      ) {
        return;
      }

      duplicateUsernameError.value = "";

      if (usernameValidationErrors.value.length) {
        return;
      }

      const { fetchDuplicateUsername_exists } = userFetcher();

      isLoading.value = duplicateUsername_isLoading.value = true;

      const result = await fetchDuplicateUsername_exists(username.value);
      if (result.result) {
        duplicateUsernameError.value = `"@${username.value}" is already used`;
      }

      isLoading.value = duplicateUsername_isLoading.value = false;
    });

    // 入力されたタイミングからエラーを表示させる
    watch(name, () => {
      showNameError.value = true;
    });
    watch(username, () => {
      showUsernameError.value = true;
    });
    watch(country_id, () => {
      showCountryError.value = true;
    });

    /**
     * methods
     */
    const storeFromData = () => {
      const data = {
        name: name,
        username: username,
        country_id: country_id,
      };

      store.dispatch("setForm_userProfile", data);
    };

    const submit = async () => {
      // フォームが無効な場合エラーを表示する
      if (!formIsAllValid.value) {
        showNameError.value =
          showUsernameError.value =
          showCountryError.value =
            true;
        return;
      }

      isLoading.value = true;

      const { postUserProfile, updateUserProfile } = userFetcher();

      storeFromData();

      const currentUserProfile = store.getters.userProfile;

      // APIにPOSTする前に更新を反映
      store.dispatch("setUserProfile", {
        auth_id: store.getters.auth_id,
        country: countries.find(
          (el) => el.code == store.getters.form_userProfile.country_id
        ).label,
        country_id: store.getters.form_userProfile.country_id,
        name: store.getters.form_userProfile.name,
        username: store.getters.form_userProfile.username,
      });

      try {
        let response;
        if (props.isRegister) {
          response = await postUserProfile();
        } else {
          response = await updateUserProfile();
        }
        const result = JSON.parse(JSON.stringify(response));

        if (result) {
          context.emit("success");
        }
      } catch (e) {
        errors.value = e.response.data.errors;
        store.dispatch("setUserProfile", currentUserProfile);
      }

      isLoading.value = false;
    };

    // アップデート用フォームの場合現在の値を入れる
    if (!props.isRegister) {
      name.value = store.getters.userProfile.name;
      username.value = store.getters.userProfile.username;
      selected_country.value = {
        code: store.getters.userProfile.country_id,
        label: store.getters.userProfile.country,
      };

      storeFromData();
    }

    return {
      name,
      username,
      country_id,
      selected_country,
      countries,
      usernameIsFocus,
      errors,
      nameValidationErrors,
      usernameValidationErrors,
      countryValidationErrors,
      duplicateUsernameError,
      formIsAllValid,
      showNameError,
      showUsernameError,
      showCountryError,
      isLoading,
      duplicateUsername_isLoading,
      submit,
      storeFromData,
    };
  },
};
</script>
<style>
.vs__dropdown-toggle {
  height: 2.625rem;
}
</style>
