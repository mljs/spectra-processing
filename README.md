# ml-spectra-processing

[![NPM version](https://img.shields.io/npm/v/ml-spectra-processing.svg)](https://www.npmjs.com/package/ml-spectra-processing)
[![npm download](https://img.shields.io/npm/dm/ml-spectra-processing.svg)](https://www.npmjs.com/package/ml-spectra-processing)
[![test coverage](https://img.shields.io/codecov/c/github/mljs/spectra-processing.svg)](https://codecov.io/gh/mljs/spectra-processing)
[![license](https://img.shields.io/npm/l/ml-spectra-processing.svg)](https://github.com/mljs/spectra-processing/blob/main/LICENSE)
[![DOI](https://www.zenodo.org/badge/196417515.svg)](https://www.zenodo.org/badge/latestdoi/196417515)

Various functions to process spectra. Those are `pure` functions.

They are sorted in various categories:

- matrix: functions on ml-matrix instances (or array of arrays)
- x: functions that apply on a 1D array
- xy: functions that apply on an object `{x: [], y:[]}`
- xy2: functions that apply on an array of arrays of 2 numbers `[[x,y], [x,y]]`
- xyArray: functions that apply on an array of objects `{x: [], y:[]}`
- xyObject: functions that apply on an array of point `[{x,y}]`
- xreim: functions that apply on an object `{x: [], re:[], im:[]}`
- reim: functions that apply on an object `{re: [], im:[]}`
- zone: functions that apply on a zone `{from,to}`
- zones: functions that apply on an array of zone `[{from,to}]`

The name of the functions start with the first argument on which they apply.

## Installation

```console
npm install ml-spectra-processing
```

## Usage

```js
import { xAdd } from 'ml-spectra-processing';

const array = [1, 2, 3];
const result = xAdd(array, 5);
console.log(result);
```

## [API Documentation](https://mljs.github.io/spectra-processing/)

## License

[MIT](./LICENSE)
