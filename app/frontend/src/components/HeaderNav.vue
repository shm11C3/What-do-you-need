<template>
  <div class="header">
    <nav class="flex items-center justify-between flex-wrap bg-blue-500 p-6">
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
            to=""
            class="block mt-4 lg:inline-block lg:mt-0 text-gray-100 hover:text-white mr-4"
          >
            コンテンツ名
          </router-link>
          <router-link
            to="/"
            class="block mt-4 lg:inline-block lg:mt-0 text-gray-100 hover:text-white"
          >
            コンテンツ名
          </router-link>
        </div>
        <div
          class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-100 hover:bg-white mt-4 lg:mt-0"
        >
          <div v-if="userIsLoading">Loading ...</div>
          <div v-else>
            <div v-if="isAuthenticated">
              <router-link to="/user/profile">
                {{ user.nickname }}
              </router-link>
            </div>
            <div v-else>
              <button @click="login">Log in</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { useAuth0 } from "@auth0/auth0-vue";

export default {
  setup() {
    const auth0 = useAuth0();

    return {
      login() {
        auth0.loginWithRedirect();
      },
      user: auth0.user,
      isAuthenticated: auth0.isAuthenticated,
      userIsLoading: auth0.isLoading,
    };
  },
};
</script>
