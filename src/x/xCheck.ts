import { isAnyArray } from 'is-any-array';

import { ArrayType } from '..';

/**
 * Checks if input is valdi
 *
 * @param {ArrayType} input input
 */
export function xCheck(input?: ArrayType) {
  if (!isAnyArray(input)) {
    throw new TypeError('input must be an array');
  }

  if ((input as number[]).length === 0) {
    throw new TypeError('input must not be empty');
  }
}

/**
 * @param {ArrayType} array1 first array
 * @param {ArrayType} array2 second array
 */
export function xCheckLengths(array1: ArrayType, array2: ArrayType) {
  if (array1.length !== array2.length) {
    throw new TypeError('Length of array1 and array2 must be identical');
  }
}
