# MurmurHash WASM

[![Build Status](https://github.com/jonahsnider/murmurhash-wasm/workflows/CI/badge.svg)](https://github.com/jonahsnider/murmurhash-wasm/actions)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![codecov](https://codecov.io/gh/jonahsnider/murmurhash-wasm/branch/main/graph/badge.svg)](https://codecov.io/jonahsnider/murmurhash-wasm)

MurmurHash implementations in WASM.

Generated documentation is here: <https://murmurhash-wasm.jonah.pw>.

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
