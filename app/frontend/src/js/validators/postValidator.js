/**
 *
 * @returns validationTitle, validationContent, requireForm,
 */
export default function () {
  const split = require("graphemesplit");

  /**
   *
   * @param {string} title
   * @return {array} result
   */
  const validationTitle = (title) => {
    let result = [];

    if (split(title).length > 45) {
      result.push("Title must be 45 characters or less");
    }

    return result;
  };

  /**
   *
   * @param {string} content
   * @return {array} result
   */
  const validationContent = (content) => {
    let result = [];

    if (split(content).length > 4096) {
      result.push("Content must be 4096 characters or less");
    }

    return result;
  };

  /**
   *
   * @param {object} form
   * @return {array} result
   */
  const requireForm = (form) => {
    let result = [];

    if (split(form.title).length < 1) {
      result.push("title");
    }
    if (split(form.content).length < 1) {
      result.push("content");
    }
    if (form.category == null) {
      result.push("category");
    }

    return result;
  };

  return {
    validationTitle,
    validationContent,
    requireForm,
  };
}
