import { NumberArray } from 'cheminfo-types';

import { xCheck } from './xCheck';

export interface XSamplingOptions {
  /**
   * number of points to sample within the array
   * @default 10
   */
  length?: number;
}

/**
 * Sample within the array
 * @param array - array from which to sample
 * @param options - options
 * @returns - array with evenly spaced elements
 * @link https://en.wikipedia.org/wiki/Sampling_(signal_processing)
 */
export function xSampling(
  array: NumberArray,
  options: XSamplingOptions = {},
): Float64Array {
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
 * @param length
 * @returns - array with evenly spaced elements
 * @link https://en.wikipedia.org/wiki/Downsampling_(signal_processing)
 */
function downSampling(array: NumberArray, length: number): Float64Array {
  const returnArray = new Float64Array(length);
  const delta = (array.length - 1) / (length - 1);

  for (let i = 0; i < length; i++) {
    returnArray[i] = array[Math.round(i * delta)];
  }

  return returnArray;
}
