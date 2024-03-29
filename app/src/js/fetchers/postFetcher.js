import axios from "axios";
import "../setting/axios";
import store from "@/store/index.js";

export default function () {
  /**
   * Post `/post`
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
          "post",
          {
            title: store.getters.form_post.title,
            content: store.getters.form_post.content,
            category_uuid: store.getters.form_post.category_uuid,
            is_draft: store.getters.form_post.is_draft,
            is_publish: store.getters.form_post.is_publish,
            image_group_uuid: store.getters.form_post.image_group_uuid,
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
   * PUT `/post`
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
          "post",
          {
            ulid: store.getters.form_post.ulid,
            title: store.getters.form_post.title,
            content: store.getters.form_post.content,
            category_uuid: store.getters.form_post.category_uuid,
            is_draft: store.getters.form_post.is_draft,
            is_publish: store.getters.form_post.is_publish,
            image_group_uuid: store.getters.form_post.image_group_uuid,
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
   * GET `/posts`
   *
   * @param {int} page
   * @returns {Promise}
   */
  const fetchPosts = (page) => {
    const authorizationHeader = store.getters.isAuthenticated
      ? {
          Authorization: `Bearer ${store.getters.idToken}`,
        }
      : {};

    return new Promise((resolve, reject) => {
      axios
        .get("posts", {
          headers: authorizationHeader,
          params: {
            page: page,
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
   * GET `/post/{ulid}`
   *
   * @param {string} ulid
   * @returns {Promise}
   */
  const fetchPost = (ulid) => {
    const authorizationHeader = store.getters.isAuthenticated
      ? {
          Authorization: `Bearer ${store.getters.idToken}`,
        }
      : {};

    return new Promise((resolve, reject) => {
      axios
        .get(`post/${ulid}`, {
          headers: authorizationHeader,
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
  const fetchDrafts = (page) => {
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
          params: {
            page: page,
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
   * DELETE `post`
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
        .delete("post", {
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

  /**
   * GET `/posts/{username}`
   *
   * @param {string} username
   * @param {int} page
   * @returns {Promise}
   */
  const fetchUserPosts = (username, page, auth = true) => {
    const authorizationHeader =
      store.getters.isAuthenticated && auth
        ? {
            Authorization: `Bearer ${store.getters.idToken}`,
          }
        : {};

    return new Promise((resolve, reject) => {
      axios
        .get(`/posts/${username}`, {
          headers: authorizationHeader,
          params: {
            page: page,
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

  return {
    submitPost,
    updatePost,
    fetchPosts,
    fetchPost,
    fetchCategories,
    fetchDrafts,
    deletePost,
    fetchUserPosts,
  };
}
