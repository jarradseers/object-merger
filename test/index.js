/*!
 * Object Merger.
 *
 * Test entry.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 27/03/2017 NZDT
 */


/**
 * Module dependencies.
 */

const assert = require('assert');
const merge = require('../');
const obj1 = require('./object1');
const obj2 = require('./object2');
const obj3 = require('./object3');
const expected = require('./expected');

let total = 0;

// Merge objects to create object 4.
const obj4 = merge(obj1, obj2, obj3);

// Test that object 4 matches what we expect.
assert.deepEqual(obj4, expected) || total++;

// Test that none of the original objects have changed.
[obj1, obj2, obj3].forEach((obj, int) => {
  assert.deepEqual(require(`./object${int + 1}`), obj) || total++;
});

// If we've passed all the tests.
console.log(`All ${total} of ${total} tests passed.`);
