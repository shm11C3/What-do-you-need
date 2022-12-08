export default function () {
  /**
   * Check if string is ulid
   *
   * @param {string} content
   * @returns {boolean}
   */
  const isUlid = (content) => {
    const regexp = new RegExp("[0-9a-hjkmnp-zA-HJKMNP-Z]{26}");
    return regexp.test(content);
  };

  return {
    isUlid,
  };
}
