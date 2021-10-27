import { xCheck } from './xCheck';
/**
 * Computes the index of the maximum of the given values
 *
 * @param {Array<number>} array array of numbers
 * @returns {number} indexe
 */
export function xMaxIndex(
  array: number[] | Float64Array | Uint16Array,
): number {
  xCheck(array);

  let maxIndex = 0;

  for (let i = 1; i < array.length; i++) {
    if (array[i] > array[maxIndex]) {
      maxIndex = i;
    }
  }
  return maxIndex;
}
