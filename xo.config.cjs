const base = require('@jonahsnider/xo-config');

const config = {...base};

config.rules['unicorn/prefer-module'] = 'off';
config.rules['import/namespace'] = 'off';
config.rules['import/extensions'] = 'off';

config.overrides ??= [];
config.overrides.push(
	{
		files: './assembly/**/*',
		rules: {
			'unicorn/prefer-export-from': 'off',
			'import/extensions': ['error', 'never'],
		},
	},
	{
		files: './**/*.test.*',
		rules: {
			'import/extensions': ['error', 'never'],
		},
	},
	// Contains syntax errors to Prettier
	{
		files: './assembly/hash*.ts',
		prettier: false,
	},
	{
		files: './assembly/**/*',
		rules: {
			'no-bitwise': 'off',
			'no-use-extend-native/no-use-extend-native': 'off',
			'unicorn/prefer-math-trunc': 'off',
		},
	},
	{
		files: './src/**/*',
		rules: {
			// Incompatible with API Extractor
			'unicorn/prefer-export-from': 'off',

			// Browser support
			'node/prefer-global/buffer': 'off',
		},
	},
);

config.ignores ??= [];
config.ignores.push('./src/types/wasm-raw.d.ts');

module.exports = config;
