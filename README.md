# Object Merger

[![CI](https://github.com/jarradseers/object-merger/actions/workflows/ci.yml/badge.svg)](https://github.com/jarradseers/object-merger/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/object-merger.svg)](https://www.npmjs.com/package/object-merger)

Merge JavaScript objects deeply instead of overwriting them. Essentially a deep `Object.assign` that returns a new object. Small, with no dependencies.

## Installation

```bash
$ npm install object-merger
```

## Usage

```js
const merge = require('object-merger');

const defaults = { server: { port: 3000, cache: true }, plugins: ['a'] };
const local = { server: { port: 8080 }, plugins: ['b'] };

merge(defaults, local);
// { server: { port: 8080, cache: true }, plugins: ['a', 'b'] }
```

Pass as many objects as you like. They are merged from left to right into a new object; the objects you pass in are not modified.

## How values are merged

| Value | Result |
|---|---|
| Plain objects | Merged key by key, recursively. |
| Arrays | Concatenated, earlier items first. |
| Everything else | The later value replaces the earlier one. This includes `null`, dates, regular expressions and class instances, which are kept as they are rather than copied. |

If the two values are of different kinds (an object and an array, say) the later one wins.

Arguments that are not objects are ignored.

## Security

A `__proto__` key is skipped, and `constructor` and `prototype` are treated as ordinary keys, so merging untrusted JSON cannot modify `Object.prototype`. Versions before 1.0.4 were vulnerable to prototype pollution.

## Tests

```bash
$ npm install
$ npm test
```

## License

[MIT](LICENSE)
