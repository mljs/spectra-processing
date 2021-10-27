import { xCheck } from './xCheck';

/**
 * Computes the index of the minimum of the given values
 *
 * @param {Array<number>} array array of numbers
 * @returns {number} result
 */
export function xMinIndex(
  array: number[] | Float64Array | Uint16Array,
): number {
  xCheck(array);
  let minIndex = 0;
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[minIndex]) {
      minIndex = i;
    }
  }
  return minIndex;
}
