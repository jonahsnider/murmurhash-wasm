// eslint-disable-next-line unicorn/prefer-node-protocol
import {Buffer as BufferShim} from 'buffer/';

export const BufferPonyfill = typeof Buffer === 'undefined' ? (BufferShim as unknown as BufferConstructor) : Buffer;

/**
 * Convert a `string` to a `Buffer`.
 *
 * @param string - The string to convert to a `Buffer`
 *
 * @returns A `Buffer` instance containing the string
 */
export function stringToBuffer(string: string): Buffer {
	return BufferPonyfill.from(string);
}
