# spectra-processing

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

Various method to process spectra. There are sorted in 3 categories:

* array : functions that apply on a 1D array
* xy : functions that apply on an object `{x: [], y:[]}`
* xreim: functions that apply on an object `{x: [], re:[], im:[]}`
* reim: functions that apply on an object `{re: [], im:[]}`

## Installation

`$ npm i ml-spectra-processing`



## Build the project and publish it on npm

`npm install --global cheminfo-build`
`cheminfo-publish`

## Usage


```js
const closest = require('ml-spectra-processing').arrayFindClosestIndex;

// or

const {arrayFindClosestIndex} = require('ml-spectra-processing');
```
or using ES6 modules

```js
import {arrayFindClosestIndex} from 'ml-spectra-processing';

// you can also extract only one fucntion

import {arrayFindClosestIndex} from 'ml-spectra-processing/src/array/arrayFindClosestIndex';
```



## [API Documentation](https://mljs.github.io/spectra-processing/)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-spectra-processing.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/ml-spectra-processing
[travis-image]: https://img.shields.io/com/travis/mljs/spectra-processing/master.svg?style=flat-square
[travis-url]: https://travis-ci.com/mljs/spectra-processing
[codecov-image]: https://img.shields.io/codecov/c/github/mljs/spectra-processing.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/mljs/spectra-processing
[download-image]: https://img.shields.io/npm/dm/spectra-processing.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/spectra-processing
