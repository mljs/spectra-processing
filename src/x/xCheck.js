import { isAnyArray } from 'is-any-array';

/**
 * Checks if input is valdi
 *
 * @param {Array<number>} input
 */
export function xCheck(input) {
  if (!isAnyArray(input)) {
    throw new TypeError('input must be an array');
  }

  if (input.length === 0) {
    throw new TypeError('input must not be empty');
  }
}

/**
 * @param array1
 * @param array2
 */
export function xCheckLengths(array1, array2) {
  if (array1.length !== array2.length) {
    throw new TypeError('Length of array1 and array2 must be identical');
  }
}
