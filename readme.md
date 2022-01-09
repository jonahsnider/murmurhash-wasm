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

```js
import {MurmurHash3} from 'murmurhash-wasm';

const key = Buffer.from('hello');
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

When running in the browser you will to polyfill `Buffer`.
