import { NumberArray } from 'cheminfo-types';

import { xCheck } from './xCheck';
import { xGetFromToIndex, XGetFromToIndexOptions } from './xGetFromToIndex';

/**
 * Calculate the sum of the values
 * @param array - Object that contains property x (an ordered increasing array) and y (an array).
 * @param options - Options.
 * @returns XSum value on the specified range.
 */
export function xSum(
  array: NumberArray,
  options: XGetFromToIndexOptions = {},
): number {
  xCheck(array);
  const { fromIndex, toIndex } = xGetFromToIndex(array, options);

  let sumValue = array[fromIndex];
  for (let i = fromIndex + 1; i <= toIndex; i++) {
    sumValue += array[i];
  }
  return sumValue;
}
