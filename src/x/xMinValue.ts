import { NumberArray } from 'cheminfo-types';

import { xCheck } from './xCheck';
import { xGetFromToIndex, XGetFromToIndexOptions } from './xGetFromToIndex';

/**
 * Computes the minimal value of an array of values.
 * @param array - array of numbers
 * @param options - options
 */
export function xMinValue(
  array: NumberArray,
  options: XGetFromToIndexOptions = {},
): number {
  xCheck(array);
  const { fromIndex, toIndex } = xGetFromToIndex(array, options);
  let minValue = array[fromIndex];
  for (let i = fromIndex + 1; i <= toIndex; i++) {
    if (array[i] < minValue) {
      minValue = array[i];
    }
  }
  return minValue;
}
