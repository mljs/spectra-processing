import { DoubleArray } from 'cheminfo-types';

import { xCheck } from './xCheck';
/**
 * Sample within the array
 * @param array - array from which to sample
 * @param options - options
 * @return - array with evenly spaced elements
 * @link https://en.wikipedia.org/wiki/Sampling_(signal_processing)
 */

export function xSampling(
  array: DoubleArray,
  options: {
    /**
     * number of points to sample within the array
     * @default 10 */
    length?: number;
  } = {},
) {
  const { length = 10 } = options;
  if (length > array.length) {
    return resampling(array, length);
  }
  return downSampling(array, length);
}

/**
 * Downsample within the array
 * @param array - array from which to sample
 * @param options - options
 * @return - array with evenly spaced elements
 * @link https://en.wikipedia.org/wiki/Downsampling_(signal_processing)
 */
function downSampling(array: DoubleArray, length: number) {
  const returnArray = new Float64Array(length);
  returnArray[0] = array[0];
  const delta = Math.floor((array.length - 1) / (length - 1));
  for (
    let i = delta, j = 0;
    i < array.length && j < length - 1;
    i = i + delta, j++
  ) {
    returnArray[j + 1] = array[i];
  }

  return returnArray;
}

/**
 * Performs resampling of an input array to the desired length employing linear interpolation.
 * @param array - Array containing values.
 * @param length - The length of the resulting array.
 * @returns It returns a new array of the desired length.
 * @link https://en.wikipedia.org/wiki/Sample-rate_conversion
 */
function resampling(array: DoubleArray, length: number) {
  xCheck(array);
  const oldLength = array.length;
  const ratio = oldLength / length;
  const result = new Float64Array(length);

  let currentIndex = 0;
  let floor = Math.floor(currentIndex);
  let ceil = Math.min(Math.ceil(currentIndex), oldLength - 1);
  let diff = currentIndex - floor;

  for (let i = 0; i < length; i++) {
    result[i] = array[floor] * diff + array[ceil] * (1 - diff);
    currentIndex += ratio;
    floor = Math.floor(currentIndex);
    ceil = Math.min(Math.ceil(currentIndex), oldLength - 1);
    diff = currentIndex - floor;
  }

  return result;
}
