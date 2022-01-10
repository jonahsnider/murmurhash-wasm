# MurmurHash WASM

[![Build Status](https://github.com/jonahsnider/murmurhash-wasm/workflows/CI/badge.svg)](https://github.com/jonahsnider/murmurhash-wasm/actions)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![codecov](https://codecov.io/gh/jonahsnider/murmurhash-wasm/branch/main/graph/badge.svg)](https://codecov.io/jonahsnider/murmurhash-wasm)

MurmurHash in WASM for Node.js and the browser.

Generated documentation is here: <https://murmurhash-wasm.jonah.pw>.

The WASM is inlined into the JS file to prevent issues from loading the module.

## Usage

### MurmurHash3

#### 32-bit hash

Hashes a provided key with a seed using the MurmurHash3 algorithm yielding a 32-bit hash.

Refer to [the documentation](https://murmurhash-wasm.jonah.pw/modules/murmurhash3#hash32) for more info.

```js
import {MurmurHash3} from 'murmurhash-wasm';

const key = 'hello';
const seed = 0;

const hash = MurmurHash3.hash32(key, seed);

const hex = hash.toString('hex');
// '5844da46'
const value = hash.readUInt32BE();
// 1480907334
```

## Installation

```sh
npm install murmurhash-wasm
# or
yarn add murmurhash-wasm
```

### Browsers

When running in the browser the global `Buffer` object will be used when available.
If it's not defined the library will use [feross/buffer](https://github.com/feross/buffer) as a fallback ([a ponyfill](https://ponyfill.com/)).

The global `Buffer` will never be modified or globally polyfilled.

## Benchmarks

Some benchmarks for the library are available in the `benchmark/` directory of the source.
See [`contributing.md`](contributing.md) for info on how to run them yourself.

The results on my MacBook Pro (16-inch, 2019) are shown below:

```text
crypto
--> MD5: 681,199ops/sec
--> SHA-1: 681,663ops/sec
murmurhash-wasm
--> MurmurHash3 32-bit: 793,651ops/sec
```

As you can see, this library performs slightly better than the native `crypto` MD5 and SHA-1 hash function implementations.

It's important to mention that the MurmurHash variants are not cryptographic hash functions like SHA-1 and MD5 were originally designed to be.
Comparing them isn't done to say "this library is a faster alternative than MD5 and SHA-1", but rather "here's how this library compares to similar hashing solutions".
