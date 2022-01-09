// Jest doesn't respect the `exports` field in package.json, so we need to use a custom resolver
// See https://github.com/facebook/jest/issues/9771 for context

const importResolver = require('enhanced-resolve').create.sync({
	conditionNames: ['import', 'node', 'default'],
	extensions: ['.js', '.json', '.node', '.ts'],
});

const requireResolver = require('enhanced-resolve').create.sync({
	conditionNames: ['require', 'node', 'default'],
	extensions: ['.js', '.json', '.node', '.ts'],
});

module.exports = function (request, options) {
	let resolver = requireResolver;
	if (options.conditions?.includes('import')) {
		resolver = importResolver;
	}

	return resolver(options.basedir, request);
};
