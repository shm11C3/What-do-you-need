import axios from "axios";
import "../setting/axios";
import store from "@/store/index.js";

export default function () {
  const idToken = store.getters.idToken;

  const addReaction = (reactable_ulid, reaction_type) => {
    return new Promise((resolve, reject) => {
      if (!idToken) {
        reject("ID Token is not registered.");
      }

      axios
        .post(
          "post/reaction",
          {
            reactable_ulid: reactable_ulid,
            reaction_type: reaction_type,
          },
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        )
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.error(error);
          reject(error);
        });
    });
  };

  return {
    addReaction,
  };
}
