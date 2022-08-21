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
        <button
          type="button"
          @click="userModal"
          class="inline-block items-center h-8 text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-100 hover:bg-white mt-4 lg:mt-0"
        >
          <div>
            <div v-if="isAuthenticated">
              <div v-if="userProfile">
                {{ userProfile.username }}
              </div>
              <div v-else>Name not registered</div>
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
              <div class="mt-4 border-t-2">
                <button class="py-2 w-full text-left">Setting</button>
              </div>
              <div class="border-t-2">
                <button @click="logout" class="py-2 w-full text-left">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { setting } from "../js/setting/style";
import { useAuth0 } from "@auth0/auth0-vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Close from "vue-material-design-icons/Close.vue";

export default {
  name: "HeaderNav",

  components: {
    Close,
  },

  setup() {
    const store = useStore();
    const auth0 = useAuth0();
    const router = useRouter();

    const isOpen = ref(false);
    let isAuthenticated = ref(store.getters.isAuthenticated);

    const userProfile = computed(() => {
      return store.getters.userProfile;
    });

    return {
      logout() {
        router.push("/logout");
      },

      userModal() {
        if (this.isAuthenticated) {
          this.isOpen = !this.isOpen;
        } else {
          router.push("/login");
        }
      },

      isOpen,
      isAuthenticated,
      cssSetting: setting,
      userProfile,
      userIsLoading: auth0.isLoading,
    };
  },

  watch: {
    $route: function (to, from) {
      if (
        from.path.includes("user/redirect/logout") ||
        from.path.includes("user/redirect/login")
      ) {
        this.isAuthenticated = this.$store.getters.isAuthenticated;
      }
    },
  },
};
</script>
