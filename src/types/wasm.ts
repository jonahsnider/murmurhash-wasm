import type * as WasmRaw from './wasm-raw';

export type Exports = typeof WasmRaw & Record<string, unknown>;
