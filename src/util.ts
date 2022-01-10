/**
 * Throws an error if the current execution environment is not supported.
 */
export function assertExecutionEnvironment(): void {
	if (typeof Buffer === 'undefined') {
		throw new TypeError(
			'The "Buffer" global is undefined, are you running in a browser? If so, you will need to polyfill "Buffer". Please see the murmurhash-wasm README for more info.',
		);
	}
}

/**
 * Convert a `string` to a `Buffer`.
 *
 * @param string - The string to convert to a `Buffer`
 *
 * @returns A `Buffer` instance containing the string
 */
export function stringToBuffer(string: string): Buffer {
	return Buffer.from(string);
}
