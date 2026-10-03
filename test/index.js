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

const { test } = require('node:test');
const assert = require('node:assert/strict');
const merge = require('../');
const obj1 = require('./object1');
const obj2 = require('./object2');
const obj3 = require('./object3');
const expected = require('./expected');

test('merges objects deeply, left to right', () => {
  assert.deepEqual(merge(obj1, obj2, obj3), expected);
});

test('returns a new object and leaves the sources untouched', () => {
  const one = { server: { port: 1, tags: ['a'] } };
  const two = { server: { host: 'x', tags: ['b'] } };
  const res = merge(one, two);

  res.server.port = 2;
  res.server.tags.push('c');

  assert.deepEqual(one, { server: { port: 1, tags: ['a'] } });
  assert.deepEqual(two, { server: { host: 'x', tags: ['b'] } });
  assert.notEqual(res.server, one.server);
});

test('later values win', () => {
  assert.deepEqual(merge({ a: 1, b: 'x' }, { a: 2 }, { a: 3 }), { a: 3, b: 'x' });
});

test('concatenates arrays', () => {
  assert.deepEqual(merge({ list: [1, 2] }, { list: [3] }), { list: [1, 2, 3] });
});

test('replaces a value when the types differ', () => {
  assert.deepEqual(merge({ a: 1 }, { a: { b: 2 } }), { a: { b: 2 } });
  assert.deepEqual(merge({ a: { b: 2 } }, { a: 1 }), { a: 1 });
  assert.deepEqual(merge({ a: [1] }, { a: { b: 2 } }), { a: { b: 2 } });
  assert.deepEqual(merge({ a: { b: 2 } }, { a: [1] }), { a: [1] });
});

test('merges null and undefined values instead of throwing', () => {
  assert.deepEqual(merge({ one: { two: 2 } }, { one: null, three: null }), { one: null, three: null });
  assert.deepEqual(merge({ a: 1 }, { a: undefined }), { a: undefined });
});

test('keeps dates, regular expressions and class instances intact', () => {
  class Thing {}
  const date = new Date(0);
  const regex = /x/g;
  const thing = new Thing();
  const res = merge({ date: { old: true }, nested: {} }, { date, nested: { regex, thing } });

  assert.equal(res.date, date);
  assert.equal(res.nested.regex, regex);
  assert.equal(res.nested.thing, thing);
});

test('ignores arguments that are not objects', () => {
  assert.deepEqual(merge(null, undefined, 1, 'two', { a: 1 }), { a: 1 });
  assert.deepEqual(merge(), {});
});

test('cannot pollute Object.prototype', () => {
  merge({}, JSON.parse('{"__proto__":{"polluted":true}}'));
  merge({}, JSON.parse('{"constructor":{"prototype":{"polluted":true}}}'));

  assert.equal('polluted' in {}, false);
});

test('keeps constructor and prototype as ordinary keys', () => {
  const res = merge({ constructor: { a: 1 } }, { constructor: { b: 2 }, prototype: 'x' });

  assert.deepEqual(Object.keys(res), ['constructor', 'prototype']);
  assert.deepEqual(res.constructor, { a: 1, b: 2 });
});
