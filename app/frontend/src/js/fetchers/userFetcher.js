import axios from "axios";
import "../setting/axios";
import store from "@/store/index.js";

export default function () {
  /**
   * `user/profile` からユーザープロフィールを取得
   *
   * @return {Promise}
   */
  const fetchUserProfile = () => {
    const idToken = store.getters.idToken;

    return new Promise((resolve, reject) => {
      if (!idToken) {
        reject("ID Token is not registered.");
      }

      axios
        .get("user/profile", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })
        .then(function (response) {
          resolve([
            response.data,
            { isExist_userProfile: response.data.code != 2000 },
          ]);
        })
        .catch(function (error) {
          console.error(error);
          reject(error);
        });
    });
  };

  const postUserProfile = () => {
    const form_data = store.getters.form_userProfile;
    const idToken = store.getters.idToken;

    return new Promise((resolve, reject) => {
      if (!idToken) {
        reject("ID Token is not registered.");
      }

      axios
        .post("user/create", form_data, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })
        .then(function (response) {
          resolve([
            response.data,
            { isExist_userProfile: response.data.code != 2000 },
          ]);
        })
        .catch(function (error) {
          console.error(error);
          reject(error);
        });
    });
  };

  const fetchDuplicateUsername_exists = (request_username) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`/user/username/exists?username=${request_username}`)
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
    fetchUserProfile,
    postUserProfile,
    fetchDuplicateUsername_exists,
  };
}
