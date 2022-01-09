import fs from 'fs';
import path from 'path';
import {instantiateSync} from '@assemblyscript/loader';
import type * as Wasm from './types/wasm.js';

let PROJECT_ROOT = path.join(__dirname, '..');

if (path.basename(PROJECT_ROOT) === 'dist') {
	PROJECT_ROOT = path.join(PROJECT_ROOT, '..');
}

const WASM_PATH = path.join(PROJECT_ROOT, 'wasm', 'mod.wasm');

const wasmModule = instantiateSync<Wasm.Exports>(fs.readFileSync(WASM_PATH));

export const wasm = wasmModule.exports;
