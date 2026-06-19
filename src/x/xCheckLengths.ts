import type { NumberArray } from 'cheminfo-types';

/**
 * Check that two arrays have the same length.
 * @param array1 - first array.
 * @param array2 - second array.
 */
export function xCheckLengths(array1: NumberArray, array2: NumberArray) {
  if (array1.length !== array2.length) {
    throw new TypeError('length of array1 and array2 must be identical');
  }
}
