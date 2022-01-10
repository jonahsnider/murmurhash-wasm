import {Benchmark} from '@jonahsnider/benchmark';
import cryptoSuite from './suites/crypto.js';
import murmurhashWasmSuite from './suites/murmurhash-wasm.js';

const benchmark = new Benchmark();

await benchmark.addSuite(murmurhashWasmSuite, {threaded: true});
await benchmark.addSuite(cryptoSuite, {threaded: true});

const results = await benchmark.runSuites();

for (const [suiteName, suite] of results) {
	console.log(`${suiteName}`);
	for (const [testName, test] of suite) {
		const durationNanoseconds = test.percentile(50);
		const opsPerSecond = Math.round(1_000_000_000 / durationNanoseconds).toLocaleString();

		console.log(`--> ${testName}: ${opsPerSecond}ops/sec`);
	}
}
