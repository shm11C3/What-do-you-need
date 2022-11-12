import axios from "axios";
import "../setting/axios";

export default function () {
  /**
   * GET: `/`
   *
   * @param void
   * @returns Promise
   */
  const fetchRoot = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("/")
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
    fetchRoot,
  };
}
