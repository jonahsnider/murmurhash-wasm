import {Buffer} from 'node:buffer';
import {UINT32_MAX_VALUE} from '../../src/constants';
import {MurmurHash3} from '../../src/index';

describe('input validation', () => {
	describe('seed', () => {
		it('throws if value is below 0', () => {
			expect(() => MurmurHash3.hash32(Buffer.alloc(0), -1)).toThrowError(RangeError);
			expect(() => MurmurHash3.hash32(Buffer.alloc(0), 0)).not.toThrow();
		});

		it('throws if value exceeds unsigned 32-bit integer max value', () => {
			expect(() => MurmurHash3.hash32(Buffer.alloc(0), UINT32_MAX_VALUE + 1)).toThrowError(RangeError);
			expect(() => MurmurHash3.hash32(Buffer.alloc(0), UINT32_MAX_VALUE)).not.toThrow();
		});
	});
});

describe('input transformation', () => {
	describe('key', () => {
		it('converts string to Buffer', () => {
			expect(MurmurHash3.hash32('hello', 0)).toStrictEqual(MurmurHash3.hash32(Buffer.from('hello'), 0));
		});
	});
});

// Taken from https://stackoverflow.com/a/31929528/10808983

describe('empty input', () => {
	describe('seed 0', () => {
		it('returns 0', () => {
			expect(MurmurHash3.hash32(Buffer.alloc(0), 0)).toStrictEqual(Buffer.of(0x0, 0x0, 0x0, 0x0));
		});
	});

	describe('seed 1', () => {
		it('works', () => {
			expect(MurmurHash3.hash32(Buffer.alloc(0), 1)).toStrictEqual(Buffer.of(0x51, 0x4e, 0x28, 0xb7));
		});
	});

	describe('seed uses unsigned math', () => {
		it('works', () => {
			expect(MurmurHash3.hash32(Buffer.alloc(0), 0xff_ff_ff_ff)).toStrictEqual(Buffer.of(0x81, 0xf1, 0x6f, 0x39));
		});
	});
});

describe('4 byte chunks use unsigned math', () => {
	it('works', () => {
		expect(MurmurHash3.hash32(Buffer.of(0xff, 0xff, 0xff, 0xff), 0)).toStrictEqual(Buffer.of(0x76, 0x29, 0x3b, 0x50));
	});
});

describe('correct endian order', () => {
	it('works', () => {
		expect(MurmurHash3.hash32(Buffer.of(0x21, 0x43, 0x65, 0x87), 0)).toStrictEqual(Buffer.of(0xf5, 0x5b, 0x51, 0x6b));
	});
});

describe('special seed that XORs initial key away', () => {
	it('works', () => {
		expect(MurmurHash3.hash32(Buffer.of(0x21, 0x43, 0x65, 0x87), 0x50_82_ed_ee)).toStrictEqual(Buffer.of(0x23, 0x62, 0xf9, 0xde));
	});
});

describe('3 bytes', () => {
	it('works', () => {
		expect(MurmurHash3.hash32(Buffer.of(0x21, 0x43, 0x65), 0)).toStrictEqual(Buffer.of(0x7e, 0x4a, 0x86, 0x34));
	});
});

describe('2 bytes', () => {
	it('works', () => {
		expect(MurmurHash3.hash32(Buffer.of(0x21, 0x43), 0)).toStrictEqual(Buffer.of(0xa0, 0xf7, 0xb0, 0x7a));
	});
});

describe('1 byte', () => {
	it('works', () => {
		expect(MurmurHash3.hash32(Buffer.of(0x21), 0)).toStrictEqual(Buffer.of(0x72, 0x66, 0x1c, 0xf4));
	});
});

describe('0s', () => {
	it('four 0s', () => {
		expect(MurmurHash3.hash32(Buffer.of(0x0, 0x0, 0x0, 0x0), 0)).toStrictEqual(Buffer.of(0x23, 0x62, 0xf9, 0xde));
	});

	it('three 0s', () => {
		expect(MurmurHash3.hash32(Buffer.of(0x0, 0x0, 0x0), 0)).toStrictEqual(Buffer.of(0x85, 0xf0, 0xb4, 0x27));
	});

	it('two 0s', () => {
		expect(MurmurHash3.hash32(Buffer.of(0x0, 0x0), 0)).toStrictEqual(Buffer.of(0x30, 0xf4, 0xc3, 0x06));
	});

	it('one 0', () => {
		expect(MurmurHash3.hash32(Buffer.of(0x0), 0)).toStrictEqual(Buffer.of(0x51, 0x4e, 0x28, 0xb7));
	});
});
