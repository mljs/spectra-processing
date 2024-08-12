import { NumberArray } from 'cheminfo-types';

import { xCheck } from './xCheck';
import { xGetFromToIndex, XGetFromToIndexOptions } from './xGetFromToIndex';

/**
 * Computes the maximal value of an array of values
 * @param array - array of numbers
 * @param options - options
 */
export function xMaxAbsoluteValue(
  array: NumberArray,
  options: XGetFromToIndexOptions = {},
): number {
  xCheck(array);
  const { fromIndex, toIndex } = xGetFromToIndex(array, options);
  let maxValue = array[fromIndex];

  for (let i = fromIndex + 1; i <= toIndex; i++) {
    if (array[i] >= 0) {
      if (array[i] > maxValue) {
        maxValue = array[i];
      }
    } else if (-array[i] > maxValue) {
      maxValue = -array[i];
    }
  }
  return maxValue;
}
