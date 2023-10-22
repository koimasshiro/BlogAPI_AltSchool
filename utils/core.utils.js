/**
 * Return Time to Read
 * @param {*} length Length of Body / article
 * @returns Min in Integer
 */
exports.calcRead = (length) => {
  return parseInt(length / 200) ? parseInt(length / 200) : 0;
};
