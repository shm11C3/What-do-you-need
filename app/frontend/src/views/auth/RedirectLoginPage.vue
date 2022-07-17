<script>
import { useAuth0 } from "@auth0/auth0-vue";

export default {
  setup() {
    const auth0 = useAuth0();
    auth0.loginWithRedirect();
  },
};
</script>
