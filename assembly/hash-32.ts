// @ts-expect-error Top-level decorators are allowed
@inline
function scramble32(k: u32): u32 {
	k *= 0xCC_9E_2D_51;
	k = (k << 15) | (k >> 17);
	k *= 0x1B_87_35_93;
	return k;
}

export function hash32(keyBuffer: ArrayBuffer, seed: u32): u32 {
	const key = Uint8Array.wrap(keyBuffer);

	let hash: u32 = seed;
	const kAddr: usize = memory.data(sizeof<u32>());
	let keyIndexAddr: usize = key.dataStart;
	let k: u32;

	// Read in groups of 4 bytes
	for (let i = key.length >> 2; i; i--) {
		const CHUNK_SIZE = Uint8Array.BYTES_PER_ELEMENT * 4;

		memory.copy(kAddr, keyIndexAddr, CHUNK_SIZE);
		k = load<u32>(kAddr);

		keyIndexAddr += CHUNK_SIZE;

		hash ^= scramble32(k);
		hash = (hash << 13) | (hash >> 19);
		hash = (hash * 5) + 0xE6_54_6B_64;
	}

	// Read the remaining 0-3 bytes
	k = 0;

	for (let i = key.length & 3; i; i--) {
		k <<= 8;
		k |= key[i - 1];
	}

	hash ^= scramble32(k);

	hash ^= key.length;
	hash ^= hash >> 16;
	hash *= 0x85_EB_CA_6B;
	hash ^= hash >> 13;
	hash *= 0xC2_B2_AE_35;
	hash ^= hash >> 16;

	return hash;
}
