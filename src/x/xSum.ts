import { xCheck } from './xCheck';

/**
 * Calculate the sum of the values
 *
 */

/**
 * @param {number[]} [array={}] - Object that contains property x (an ordered increasing array) and y (an array)
 * @param {object} [options={}] options
 * @param {number} [options.fromIndex=0] - First point for xSum
 * @param {number} [options.toIndex=x.length-1] - Last point for xSum
 * @returns {number} xSum value on the specified range
 */
export function xSum(
  array: number[] | Float64Array | Uint16Array,
  options: { fromIndex?: number; toIndex?: number } = {},
): number {
  const { fromIndex = 0, toIndex = array.length - 1 } = options;
  xCheck(array);

  let sumValue = array[fromIndex];
  for (let i = fromIndex + 1; i <= toIndex; i++) {
    sumValue += array[i];
  }
  return sumValue;
}
