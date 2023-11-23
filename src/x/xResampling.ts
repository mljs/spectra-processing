import { DoubleArray } from 'cheminfo-types';

import { xCheck } from './xCheck';
/**
 * Performs resampling of an input array to the desired length employing linear interpolation.
 * @param array - Array containing values.
 * @param newLength - The length of the resulting array.
 * @returns It returns a new array of the desired length.
 * @link https://en.wikipedia.org/wiki/Sampling_(signal_processing)
 */
export function xResampling(array: DoubleArray, newLength: number) {
  xCheck(array);
  const oldLength = array.length;
  const ratio = oldLength / newLength;
  const result = new Float64Array(newLength);

  let currentIndex = 0;
  let floor = Math.floor(currentIndex);
  let ceil = Math.min(Math.ceil(currentIndex), oldLength - 1);
  let diff = currentIndex - floor;

  for (let i = 0; i < newLength; i++) {
    result[i] = array[floor] * diff + array[ceil] * (1 - diff);
    currentIndex += ratio;
    floor = Math.floor(currentIndex);
    ceil = Math.min(Math.ceil(currentIndex), oldLength - 1);
    diff = currentIndex - floor;
  }

  return result;
}
