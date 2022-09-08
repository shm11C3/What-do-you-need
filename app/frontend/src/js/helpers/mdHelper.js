/**
 * Helper functions for markdown implementation
 *
 * @returns replacePlainToMd
 */
export default function () {
  /**
   * Replace plain text with markdown for conversion
   *
   * @Todo Automatically add `target="_blank"` to `<a>` in preview
   */
  const replacePlainToMd = (text) => {
    let replaced = text.split("\n").join("  \n");
    // eslint-disable-next-line no-useless-escape
    const regexp_url = /(https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+)/g;
    replaced = replaced.replace(regexp_url, "[$1]($1)");

    return replaced;
  };

  return {
    replacePlainToMd,
  };
}
