import {createHash} from 'node:crypto';
import {Suite} from '@jonahsnider/benchmark';
import {suiteOptions} from '../options.js';

const suite = new Suite('crypto', {
	...suiteOptions,
	filepath: import.meta.url,
});

suite.addTest('MD5', () => {
	return createHash('md5').update('hello world').digest('hex');
});

suite.addTest('SHA-1', () => {
	return createHash('sha1').update('hello world').digest('hex');
});

export default suite;
