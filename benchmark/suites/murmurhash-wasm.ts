import {Buffer} from 'node:buffer';
import {Suite} from '@jonahsnider/benchmark';
// @ts-expect-error Extra ../../ so imports work from the dist/benchmark folder
import * as _mod from '../../../../dist/index.mjs';
import {suiteOptions} from '../options.js';
import type * as Mod from '../../src/index';

const mod = _mod as typeof Mod;

const suite = new Suite('murmurhash-wasm', {
	...suiteOptions,
	filepath: import.meta.url,
});

suite.addTest('MurmurHash3 32-bit', () => {
	return mod.MurmurHash3.hash32(Buffer.from('hello world'), 0).toString('hex');
});

export default suite;
