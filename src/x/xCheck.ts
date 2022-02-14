import { NumberArray, DoubleArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';

/**
 * Checks if input is of type array
 *
 * @param input - input
 */
export function xCheck(input?: NumberArray) {
  if (!isAnyArray(input)) {
    throw new TypeError('input must be an array');
  }

  if ((input as number[]).length === 0) {
    throw new TypeError('input must not be empty');
  }
}

/**
 * XCheckLengths.
 *
 * @param array1 - First array.
 * @param array2 - Second array.
 */
export function xCheckLengths(array1: DoubleArray, array2: DoubleArray) {
  if (array1.length !== array2.length) {
    throw new TypeError('Length of array1 and array2 must be identical');
  }
}
