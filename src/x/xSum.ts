import { NumberArray } from 'cheminfo-types';

import { xCheck } from './xCheck';

/**
 * Calculate the sum of the values
 *
 * @param array - Object that contains property x (an ordered increasing array) and y (an array).
 * @param options - Options.
 * @returns XSum value on the specified range.
 */
export function xSum(
  array: NumberArray,
  options: {
    /**
     * First point for xSum.
     * @default 0
     */
    fromIndex?: number;
    /**
     * Last point for xSum.
     * @default x.length-1
     */
    toIndex?: number;
  } = {},
): number {
  const { fromIndex = 0, toIndex = array.length - 1 } = options;
  xCheck(array);

  let sumValue = array[fromIndex];
  for (let i = fromIndex + 1; i <= toIndex; i++) {
    sumValue += array[i];
  }
  return sumValue;
}
