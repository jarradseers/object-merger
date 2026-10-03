/*!
 * Object Merger.
 *
 * Main application file.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 27/03/2017 NZDT
 */


/**
 * Merge Function.
 *
 * @param {any} args objects to merge
 * @returns
 */

function merger(...args) {
  const res = {};

  /**
   * Apply Function.
   *
   * @param {any} obj object to apply
   * @param {any} cur cursor location
   */

  function apply(obj, cur) {
    if (typeof obj !== 'object' || obj === null) return;
    Object.keys(obj).forEach((key) => {
      if (key === '__proto__') return;
      const own = Object.prototype.hasOwnProperty.call(cur, key);

      if (Array.isArray(obj[key])) {
        cur[key] = own && Array.isArray(cur[key])
          ? cur[key].concat(obj[key])
          : obj[key];
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (!own || typeof cur[key] !== 'object' || cur[key] === null) cur[key] = {};
        apply(obj[key], cur[key]);
      } else {
        cur[key] = obj[key];
      }
    });
  }

  /**
   * Apply merge for each object argument.
   */

  args.forEach((obj) => apply(obj, res));

  return res;
}

/**
 * Module exports.
 */

module.exports = merger;

