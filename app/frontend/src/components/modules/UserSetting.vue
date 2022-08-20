<template>
  <div class="mx-3">
    <div class="shadow-xl rounded-lg">
      <button
        class="flex items-center h-14 w-full hover:bg-gray-100 hover:text-blue-900 mt-8 rounded-t-lg"
      >
        <AccountKey class="mx-2"></AccountKey>
        <p class="text-xl">Change Your Password</p>
      </button>
      <button
        class="flex items-center h-14 w-full hover:bg-gray-100 text-red-500 hover:text-pink-700"
      >
        <AccountRemove class="mx-2" />
        <p class="text-xl">Delete Your Account</p>
      </button>
      <div class="flex items-center h-14 w-full rounded-b-lg">
        <AccountClock class="mx-2 svg-reversal" />
        <p class="text-xl">
          Registration Date:
          <span class="text-gray-500 text-lg">{{ registrationDate }}</span>
        </p>
      </div>
    </div>
    <div class="shadow-xl rounded-lg">
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
      <button
        class="flex items-center h-14 w-full hover:bg-gray-100 hover:text-blue-900"
      >
        <p class="text-xl ml-2">Application Source</p>
      </button>
      <button
        class="flex items-center h-14 w-full hover:bg-gray-100 hover:text-blue-900 rounded-b-lg"
      >
        <p class="text-xl ml-2">Contact As</p>
      </button>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import AccountKey from "vue-material-design-icons/AccountKey.vue";
import AccountRemove from "vue-material-design-icons/AccountRemove.vue";
import AccountClock from "vue-material-design-icons/AccountClock.vue";

export default {
  components: {
    AccountKey,
    AccountRemove,
    AccountClock,
  },
  setup() {
    const store = useStore();

    let registrationDate;
    const created_at = store.getters.userProfile.created_at;

    if (!created_at) {
      registrationDate = "No Data";
    } else {
      registrationDate = created_at.split(" ")[0];
    }

    return {
      registrationDate,
    };
  },
};
</script>
<style>
.leading-14 {
  line-height: 14px;
}
.svg-reversal {
  transform: scale(-1, 1);
}
</style>
