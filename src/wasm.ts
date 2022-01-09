import {instantiateSync} from '@assemblyscript/loader';
import wasmBuffer from '../wasm/mod.wasm';
import type * as Wasm from './types/wasm.js';

const wasmModule = instantiateSync<Wasm.Exports>(wasmBuffer);

export const wasm = wasmModule.exports;
