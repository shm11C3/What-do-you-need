<template>
  <div class="header">
    <nav class="flex items-center justify-between flex-wrap p-5 bg-blue-500">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <router-link to="/" class="font-semibold text-xl tracking-tight"
          >What do you want?</router-link
        >
      </div>
      <div class="block lg:hidden">
        <!--<button
          class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        >
          ここにアイコンを設置する
        </button>-->
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <router-link
            to="/"
            class="block mt-4 lg:inline-block lg:mt-0 text-gray-100 hover:text-white mr-4"
          >
            Home
          </router-link>
          <router-link
            to="/post/create"
            class="block mt-4 lg:inline-block lg:mt-0 text-gray-100 hover:text-white mr-4"
          >
            Write Post
          </router-link>
          <router-link
            to="/"
            class="block mt-4 lg:inline-block lg:mt-0 text-gray-100 hover:text-white"
          >
            コンテンツ名
          </router-link>
        </div>
        <button
          type="button"
          @click="userModal"
          class="inline-block items-center h-8 text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-100 hover:bg-white mt-4 lg:mt-0"
        >
          <div>
            <div v-if="isAuthenticated">
              <div v-if="!userProfileIsLoading">
                <div v-if="userProfile">
                  {{ userProfile.username }}
                </div>
                <div v-else>Name not registered</div>
              </div>
              <div v-else>Loading...</div>
            </div>
            <div v-else>Login</div>
          </div>
        </button>
      </div>
    </nav>
    <!--右ユーザーモーダル-->
    <div class="container mx-auto">
      <div class="flex justify-center">
        <div
          v-show="isOpen"
          class="absolute inset-0 flex items-start justify-end mt-16 mr-2"
        >
          <div class="max-w-2xl bg-white rounded-md shadow-xl">
            <div class="flex flex-row-reverse">
              <button type="button" @click="userModal">
                <Close />
              </button>
            </div>
            <div class="p-6">
              <!--プロフィールカード-->
              <div class="flex items-center justify-between">
                <router-link
                  v-on:click.prevent="userModal"
                  to="/user/profile"
                  class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-64"
                >
                  <!--Vuexから取得したプロフィール画像を表示-->
                  <h5
                    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                  >
                    <div v-if="isAuthenticated && userProfile">
                      {{ userProfile.username }}
                    </div>
                    <div v-else>Name not registered</div>
                  </h5>
                </router-link>
              </div>
              <div class="mt-4 hover:bg-gray-100">
                <router-link
                  v-on:click.prevent="userModal"
                  to="/user/profile#setting"
                  class="flex items-center py-2 w-full"
                >
                  <Cog />
                  <span class="pl-1">Setting</span>
                </router-link>
              </div>
              <div class="hover:bg-gray-100">
                <router-link to="/logout" class="flex items-center py-2 w-full">
                  <Logout />
                  <span class="pl-1">Logout</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Close from "vue-material-design-icons/Close.vue";
import Cog from "vue-material-design-icons/Cog.vue";
import Logout from "vue-material-design-icons/Logout.vue";

const store = useStore();
const router = useRouter();

const isOpen = ref(false);

const isAuthenticated = computed(() => {
  return store.getters.isAuthenticated;
});

const userProfile = computed(() => {
  return store.getters.userProfile;
});

const userProfileIsLoading = computed(() => {
  return store.getters.userProfileIsLoading;
});

const userModal = () => {
  if (store.getters.isAuthenticated) {
    isOpen.value = !isOpen.value;
  } else {
    router.push("/login");
  }
};
</script>
