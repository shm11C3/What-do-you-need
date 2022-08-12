<template>
  <div class="p-3 lg:flex justify-center">
    <div class="from-group lg:w-6/12">
      <form @submit.prevent="submit">
        <h2 class="text-4xl font-bold text-center">Register Profile</h2>
        <h3 class="mt-2 text-xl text-center">Please enter your profile</h3>
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
        </div>
        <div class="mb-4 px-2 w-full">
          <label class="block mb-1 text-sm" for="username">Username</label>
          <div class="flex">
            <span
              class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
            >
              @
            </span>

            <input
              v-model="username"
              class="rounded-none rounded-r-lg border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Username..."
            />
          </div>
          <p class="text-gray-600 text-xs italic">
            User name is a unique name for identification.
          </p>
          <div class="mt-2 w-full">
            <label class="block mb-1 text-sm">Country : </label>

            <v-select :options="countries" v-model="selected_country">
            </v-select>
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
import router from "@/router";
import AlertIndicate from "../parts/AlertIndicate.vue";

export default {
  name: "userProfileForm",

  components: {
    vSelect,
    AlertIndicate,
  },

  setup() {
    const { country_list } = country();
    const store = useStore();

    const name = ref("");
    const username = ref("");
    const selected_country = ref("");
    const errors = ref("");

    const country_id = computed(() => {
      if (!selected_country.value) {
        return null;
      }
      return selected_country.value.code;
    });

    const storeFromData = () => {
      const data = {
        name: name,
        username: username,
        country_id: country_id,
      };

      store.dispatch("setForm_userProfile", data);
    };

    const submit = async () => {
      const { postUserProfile } = userFetcher();

      storeFromData();

      // APIにPOSTする前に更新を反映
      store.dispatch("setUserProfile", {
        auth_id: store.getters.auth_id,
        country: selected_country.value.label,
        country_id: selected_country.value.code,
        name: name,
        username: username,
      });

      try {
        const result = JSON.parse(JSON.stringify(await postUserProfile()));

        if (result) {
          router.push("/userProfile");
        }
      } catch (e) {
        errors.value = e.response.data.errors;
        store.dispatch("removeUserProfile");
      }
    };

    watch([name, username, country_id], () => {
      storeFromData();
    });

    return {
      name,
      username,
      country_id,
      selected_country,
      countries: country_list,
      errors,
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
