/*!
 * Object Merger.
 *
 * Main application file.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 27/03/2017 NZDT
 */

'use strict';

/**
 * Merge Function.
 * 
 * @param {any} args objects to merge
 * @returns 
 */

const merger = (...args) => {
  const res = {};

  /**
   * Apply Function.
   * 
   * @param {any} obj object to apply
   * @param {any} cur cursor location
   */

  const apply = (obj, cur) => {
    if (!obj) return;
    Object.keys(obj).forEach(key => {
      if (Array.isArray(obj[key])) {
        cur[key] = cur[key]
          ? cur[key].concat(obj[key]) : obj[key];
      } else if (typeof obj[key] === 'object') {
        cur[key] = cur[key] || {};
        apply(obj[key], cur[key]);
      } else {
        cur[key] = obj[key];
      }
    });
  };

  /**
   * Apply merge for each object argument.
   */

  args.forEach(obj => apply(obj, res));

  return res;
}

/**
 * Module exports.
 */

module.exports = merger;

