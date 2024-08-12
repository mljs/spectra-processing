import { NumberArray } from 'cheminfo-types';

/**
 * Check that two arrays have the same length.
 * @param array1 - First array.
 * @param array2 - Second array.
 */
export function xCheckLengths(array1: NumberArray, array2: NumberArray) {
  if (array1.length !== array2.length) {
    throw new TypeError('length of array1 and array2 must be identical');
  }
}
