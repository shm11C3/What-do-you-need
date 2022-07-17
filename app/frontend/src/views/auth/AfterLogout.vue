<script>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
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
