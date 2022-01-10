/* eslint-disable no-bitwise */

import {UINT32_MAX_VALUE} from '../constants';
import {BufferPonyfill, stringToBuffer} from '../util';
import {wasm} from '../wasm';

/**
 * Hashes a provided key with a seed using the MurmurHash3 algorithm yielding a 32-bit hash.
 *
 * @example
 * ```js
 * import { MurmurHash3 } from 'murmurhash-wasm';
 *
 * const key = Buffer.from('hello');
 * const seed = 0;
 *
 * const hash = MurmurHash3.hash32(key, seed);
 *
 * const hex = hash.toString('hex');
 * // '5844da46'
 * const value = hash.readUInt32BE();
 * // 1480907334
 * ```
 *
 * @param key - The key to hash
 * @param seed - The seed to use to hash
 *
 * @returns The hash in a `Buffer` containing a single unsigned 32-bit integer in big-endian format (UInt32BE)
 *
 * @public
 */
export function hash32(key: ArrayBufferLike, seed: number): Buffer;
/**
 * Hashes a provided key with a seed using the MurmurHash3 algorithm yielding a 32-bit hash.
 * The key will be converted to a `Buffer` using `Buffer.from()`.
 *
 * @example
 * ```js
 * import { MurmurHash3 } from 'murmurhash-wasm';
 *
 * const key = 'hello';
 * const seed = 0;
 *
 * const hash = MurmurHash3.hash32(key, seed);
 *
 * const hex = hash.toString('hex');
 * // '5844da46'
 * const value = hash.readUInt32BE();
 * // 1480907334
 * ```
 *
 * @param key - The key to hash
 * @param seed - The seed to use to hash
 *
 * @returns The hash in a `Buffer` containing a single unsigned 32-bit integer in big-endian format (UInt32BE)
 *
 * @public
 */
// eslint-disable-next-line @typescript-eslint/unified-signatures
export function hash32(key: string, seed: number): Buffer;
export function hash32(key: string | ArrayBufferLike, seed: number): Buffer {
	if (seed < 0 || seed > UINT32_MAX_VALUE) {
		throw new RangeError(`The value of "seed" is out of range. It must be >= 0 and <= ${UINT32_MAX_VALUE}.`);
	}

	const keyBuffer: ArrayBufferLike = typeof key === 'string' ? stringToBuffer(key) : key;

	const keyPointer = wasm.__pin(wasm.__newArrayBuffer(keyBuffer));

	const hash = wasm.hash32(keyPointer, seed);

	const result = BufferPonyfill.allocUnsafe(4);

	result.writeUInt32BE(hash >>> 0);

	wasm.__unpin(keyPointer);

	return result;
}
