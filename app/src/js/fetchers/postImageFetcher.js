import axios from "axios";
import "../setting/axios";
import store from "@/store/index.js";

export default function () {
  const idToken = store.getters.idToken;

  /**
   * `/post/image`に画像を送信
   *
   * @param {FormData} data
   * @returns
   */
  const uploadPostImage = (data) => {
    return new Promise((resolve, reject) => {
      if (!idToken) {
        reject("ID Token is not registered.");
      }

      axios
        .post("/post/image", data, {
          headers: {
            Authorization: `Bearer ${idToken}`,
            "content-type": "multipart/form-data",
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
   * DELETE `post/image`
   *
   * @param {string} ulid
   * @returns {Promise}
   */
  const deleteImage = (uuid) => {
    return new Promise((resolve, reject) => {
      if (!idToken) {
        reject("ID Token is not registered.");
      }

      axios
        .delete("/post/image", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          data: {
            uuid: uuid,
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
    uploadPostImage,
    deleteImage,
  };
}
