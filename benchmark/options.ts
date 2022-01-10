import type {Suite} from '@jonahsnider/benchmark';

export const suiteOptions: Suite.Options = {
	run: {
		trials: 1000,
	},
	warmup: {
		durationMs: 10_000,
	},
};
