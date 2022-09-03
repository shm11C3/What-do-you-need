import axios from "axios";
import "../setting/axios";
import store from "@/store/index.js";

export default function () {
  /**
   * Post `/post/create`
   *
   * @returns Promise
   */
  const submitPost = () => {
    const idToken = store.getters.idToken;
    return new Promise((resolve, reject) => {
      if (!idToken) {
        reject("ID Token is not registered.");
      }

      axios
        .post("post/create", store.getters.form_post, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.error(error);
          reject(error);
        });
    });
  };

  /**
   * PUT `/post/update`
   *
   * @return {Promise}
   */
  const updatePost = () => {
    const idToken = store.getters.idToken;
    return new Promise((resolve, reject) => {
      if (!idToken) {
        reject("ID Token is not registered.");
      }

      axios
        .put("post/update", store.getters.form_post, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.error(error);
          reject(error);
        });
    });
  };

  /**
   * GET `/categories`
   *
   * @return {Promise}
   */
  const fetchCategories = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("categories")
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  };

  return {
    submitPost,
    updatePost,
    fetchCategories,
  };
}
