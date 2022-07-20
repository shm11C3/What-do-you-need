<template>
  <LoadingSpinner class="mt-20" />
</template>
<script>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import LoadingSpinner from "../../components/parts/LoadingSpinner.vue";

export default {
  name: "AfterLogout",
  components: {
    LoadingSpinner,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    onMounted(() => {
      store.dispatch("logout");
      router.push("/");
    });
  },
};
</script>
