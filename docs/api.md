## API Report File for "murmurhash-wasm"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

/// <reference types="node" />

// @public
function hash32(key: ArrayBufferLike, seed: number): Buffer;

// @public
function hash32(key: string, seed: number): Buffer;

declare namespace MurmurHash3 {
    export {
        hash32
    }
}
export { MurmurHash3 }

// (No @packageDocumentation comment for this package)

```