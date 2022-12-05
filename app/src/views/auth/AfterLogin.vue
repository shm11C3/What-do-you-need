<template>
  <LoadingSpinner class="mt-20" />
</template>
<script>
import { useRouter } from "vue-router";
import LoadingSpinner from "../../components/parts/LoadingSpinner.vue";

export default {
  name: "AfterLogin",
  components: {
    LoadingSpinner,
  },

  setup() {
    const router = useRouter();
    router.push("/");
  },
};
</script>
