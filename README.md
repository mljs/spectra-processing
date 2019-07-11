# spectra-processing

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

Various method to process spectra.

## Installation

`$ npm i ml-spectra-processing`

## Installation of the package not published on npm

Because we would like to add incrementally small function and directly reuse them we can directly add a dependency by adding adding directly a commit UUID.

To retrieve the commit UUID : `git log`

To add the dependency:

`npm i mljs/spectra-processing#ed33f5cc8e0f5f6e8e9210bd915c6393846dbd17`


## To build the project

` npm install --global cheminfo-build`
`cheminfo build`

## Usage

```js
import library from 'ml-spectra-processing';

const result = library(args);
// result is ...
```

## [API Documentation](https://cheminfo.github.io/spectra-processing/)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/spectra-processing.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/spectra-processing
[travis-image]: https://img.shields.io/com/travis/cheminfo/spectra-processing/master.svg?style=flat-square
[travis-url]: https://travis-ci.com/cheminfo/spectra-processing
[codecov-image]: https://img.shields.io/codecov/c/github/cheminfo/spectra-processing.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/cheminfo/spectra-processing
[download-image]: https://img.shields.io/npm/dm/spectra-processing.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/spectra-processing
