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
  xCheck(array);
  if (length === array.length) {
    return Float64Array.from(array);
  } else if (length > array.length) {
    throw new RangeError('length must be smaller than the array length');
  } else {
    return downSampling(array, length);
  }
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
  const delta = (array.length - 1) / (length - 1);

  for (let i = 0; i < length; i++) {
    returnArray[i] = array[Math.round(i * delta)];
  }

  return returnArray;
}
