<template>
  <div class="lg:flex justify-center m-2">
    <div v-show="!isLoading">
      <div
        class="bg-pink-100 text-red-700 px-4 py-3 rounded-3xl shadow mt-10 w-auto lg:w-1/2 mx-2"
      >
        <div class="flex items-center">
          <AlertOctagon :size="52" />
          <strong class="font-bold text-2xl">Warning!!</strong>
        </div>
        <p class="mt-2 text-xl">
          Performing this operation will
          <span class="font-bold">delete this account</span>. <br />
          It cannot be undone.<br />
          Are you sure you want to delete
          <span class="bg-gray-500 text-white"
            >@{{ store.getters.userProfile.username }}</span
          >?
        </p>
        <div v-show="!agree" class="flex flex-row-reverse mt-4">
          <button
            v-on:click="onClick_yes"
            class="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full lg:w-auto shadow"
          >
            Yes
          </button>
          <button
            v-on:click="cancel"
            class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full lg:w-auto shadow mr-2"
          >
            Cancel
          </button>
        </div>
        <div v-show="agree" class="mt-4">
          <p class="text-gray-600 italic">Please type "delete me"</p>
          <input
            v-model="confirmatoryInput"
            class="w-full border px-4 py-2 rounded-full text-black focus:border-black focus:shadow-outline outline-none"
            type="text"
            autofocus
            placeholder="delete me"
          />
          <div class="flex flex-row-reverse mt-2">
            <button
              v-on:click="submit"
              v-bind:disabled="!correctInputCharacter"
              class="bg-red-700 enabled:hover:bg-red-600 disabled:opacity-50 text-white font-bold py-2 px-4 rounded-full lg:w-auto shadow"
            >
              Delete
            </button>
            <button
              v-on:click="cancel"
              class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full lg:w-auto shadow mr-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-show="isLoading">
      <div v-show="error">
        <AlertIndicate class="mx-3" :message="error" />
      </div>
      <div v-show="!error">
        <LoadingSpinner />
      </div>
    </div>
  </div>
</template>
<script setup>
// [Todo] Implement Step-up Authentication

import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import AlertOctagon from "vue-material-design-icons/AlertOctagon.vue";
import userFetcher from "@/js/fetchers/userFetcher";
import AlertIndicate from "../../components/parts/AlertIndicate.vue";
import LoadingSpinner from "../../components/parts/LoadingSpinner.vue";

const router = useRouter();
const store = useStore();

const agree = ref(false);
const confirmatoryInput = ref(null);
const error = ref(null);
const isLoading = ref(false);

const correctInputCharacter = computed(() => {
  return confirmatoryInput.value == "delete me";
});

const onClick_yes = () => {
  agree.value = true;
};

const cancel = () => {
  router.push("/user/profile#setting");
};

/**
 * When the Delete button is pressed
 */
const submit = async () => {
  const { deleteAccount } = userFetcher();

  try {
    isLoading.value = true;
    const response = await deleteAccount();

    if (!response.status) {
      error.value = "An unexpected error has occurred.";
      return;
    }

    isLoading.value = false;
    router.push("/logout");
  } catch (e) {
    error.value = "An unexpected error has occurred.";
  }
};
</script>
