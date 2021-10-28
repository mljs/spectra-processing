import { isAnyArray } from 'is-any-array';

/**
 * Checks if input is valdi
 *
 * @param {Array<number>} input input
 * @returns {void}
 */
export function xCheck(
  input?: number[] | Float64Array | Float32Array | Uint16Array,
): void {
  if (!isAnyArray(input)) {
    throw new TypeError('input must be an array');
  }

  if ((input as number[]).length === 0) {
    throw new TypeError('input must not be empty');
  }
}

/**
 * @param {Array<number>} array1 first array
 * @param {Array<number>} array2 second array
 * @returns {void}
 */
export function xCheckLengths(
  array1: number[] | Float64Array,
  array2: number[] | Float64Array,
): void {
  if (array1.length !== array2.length) {
    throw new TypeError('Length of array1 and array2 must be identical');
  }
}
