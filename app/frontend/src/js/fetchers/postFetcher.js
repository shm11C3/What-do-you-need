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
        .post(
          "post/create",
          {
            title: store.getters.form_post.title,
            content: store.getters.form_post.content,
            category_uuid: store.getters.form_post.category_uuid,
            is_draft: store.getters.form_post.is_draft,
            is_publish: store.getters.form_post.is_publish,
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
        .put(
          "post/update",
          {
            ulid: store.getters.form_post.ulid,
            title: store.getters.form_post.title,
            content: store.getters.form_post.content,
            category_uuid: store.getters.form_post.category_uuid,
            is_draft: store.getters.form_post.is_draft,
            is_publish: store.getters.form_post.is_publish,
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

  /**
   * GET `/post/drafts`
   *
   * @returns {Promise}
   */
  const fetchDrafts = () => {
    const idToken = store.getters.idToken;
    return new Promise((resolve, reject) => {
      if (!idToken) {
        reject("ID Token is not registered.");
      }
      axios
        .get("post/drafts", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  };

  /**
   * DELETE `post/delete`
   *
   * @param {string} ulid
   * @returns {Promise}
   */
  const deletePost = (ulid) => {
    const idToken = store.getters.idToken;
    return new Promise((resolve, reject) => {
      if (!idToken) {
        reject("ID Token is not registered.");
      }

      axios
        .delete("post/delete", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          data: {
            ulid: ulid,
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

  return {
    submitPost,
    updatePost,
    fetchCategories,
    fetchDrafts,
    deletePost,
  };
}
