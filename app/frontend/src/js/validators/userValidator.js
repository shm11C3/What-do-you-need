export default function () {
  const split = require("graphemesplit");

  /**
   *
   * @param {str} name
   * @return {arr} result
   */
  const validationName = (name) => {
    let result = [];

    if (name.length < 1) {
      result.push("Please enter your name");
    }

    if (split(name).length > 45) {
      result.push("Name must be 45 characters or less");
    }

    return result;
  };

  /**
   *
   * @param {str} username
   * @return {arr} result
   */
  const validationUsername = (username) => {
    let result = [];

    if (username.length < 1) {
      result.push("Please enter username");
    }

    if (username.length > 16) {
      result.push("Username must be 16 characters or less");
    }

    if (username && !username.match(/^[a-zA-Z0-9_]+$/)) {
      result.push(
        "Username must only contain letters(a-Z), numbers(0-9) and underscores(_)"
      );
    }

    return result;
  };

  /**
   *
   * @param {int} country_id
   * @return {arr} result
   */
  const validationCountry = (country_id) => {
    let result = [];

    if (country_id == null) {
      result.push("Please select your country");
    }
    return result;
  };

  return {
    validationName,
    validationUsername,
    validationCountry,
  };
}
