import { ArrayType } from '..';

import { xCheck } from './xCheck';

/**.
 * Calculate the sum of the values
 *
 * @param [array={}] - Object that contains property x (an ordered increasing array) and y (an array).
 * @param [options={}] - Options.
 * @param [options.fromIndex=0] - First point for xSum.
 * @param [options.toIndex=x.length-1] - Last point for xSum.
 * @returns XSum value on the specified range.
 */
export function xSum(
  array: ArrayType,
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
