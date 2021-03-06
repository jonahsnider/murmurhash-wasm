# Contributing

## Prequisites

This project uses [Node.js](https://nodejs.org) to run, so make sure you have a version compatible with the one listed in `.node-version`.

[Yarn](https://yarnpkg.com) is used to manage dependencies and run scripts.
After cloning the repository you can use this command to install dependencies:

```sh
yarn
```

## Building

1. Run `yarn run asbuild` to compile the WASM & generate typings for it
2. Run `yarn run build` to compile and bundle the regular source code into the `dist/` folder
3. Run `yarn run types` to generate the raw type declarations for the regular source code
4. Run `yarn run validate-api:local` to generate the API report & bundled type declaration to the `dist/` folder

## Style

All files are formatted using Prettier.

You can check code style with this command:

```sh
yarn run style
```

You can format files with this command:

```sh
yarn run style --write
```

## Linting

XO (a wrapper around ESLint) is used to lint the source.

You can run the this command to lint the source:

```sh
yarn run lint
```

You can fix linting errors with this command:

```sh
yarn run lint --fix
```

## Testing

Jest is used for unit testing.

Unit tests are stored in the `test/` directory mirroring the structure of the source files (ex. `src/config.ts` would have `test/config.test.ts`).
You can run the tests with the `test` script:

```sh
yarn test
```

You can run tests in watch mode with this command:

```sh
yarn test --watch
```

### Coverage

You can collect test coverage by running this command:

```sh
yarn run test:coverage
```

This will generate a `coverage` folder which has a breakdown of coverage of the project.
The CI will upload the coverage information to [CodeCov](https://codecov.io) which can be [viewed here](https://codecov.io/gh/jonahsnider/murmurhash-wasm).

## Benchmarks

Benchmarks are stored in the `benchmark/` directory.

You can compile them by running this command:

```sh
yarn run build:benchmarks
```

And can run them with

```sh
yarn run benchmarks
```

or

```sh
node benchmark/dist/index.js
```
