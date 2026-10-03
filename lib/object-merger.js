/*!
 * Object Merger.
 *
 * Main application file.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 27/03/2017 NZDT
 */

/**
 * Is the value a plain object, one that is safe to merge key by key.
 * Dates, RegExps, Maps, class instances and the like are not.
 *
 * @param {any} val value to check
 * @returns {boolean}
 */

function isPlain(val) {
  if (typeof val !== 'object' || val === null) return false;
  const proto = Object.getPrototypeOf(val);
  return proto === Object.prototype || proto === null;
}

/**
 * Merge Function.
 *
 * @param {...object} args objects to merge, left to right
 * @returns {object} a new object
 */

function merger(...args) {
  const res = {};

  /**
   * Apply Function.
   *
   * @param {object} obj object to apply
   * @param {object} cur cursor location
   */

  function apply(obj, cur) {
    Object.keys(obj).forEach((key) => {
      if (key === '__proto__') return;
      const val = obj[key];
      const own = Object.prototype.hasOwnProperty.call(cur, key);

      if (Array.isArray(val)) {
        cur[key] = own && Array.isArray(cur[key])
          ? cur[key].concat(val)
          : val.slice();
      } else if (isPlain(val)) {
        if (!own || !isPlain(cur[key])) cur[key] = {};
        apply(val, cur[key]);
      } else {
        cur[key] = val;
      }
    });
  }

  /**
   * Apply merge for each object argument.
   */

  args.forEach((obj) => {
    if (typeof obj === 'object' && obj !== null) apply(obj, res);
  });

  return res;
}

/**
 * Module exports.
 */

module.exports = merger;
