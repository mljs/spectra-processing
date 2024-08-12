import { NumberArray } from 'cheminfo-types';

import { xCheck } from './xCheck';
import { xGetFromToIndex, XGetFromToIndexOptions } from './xGetFromToIndex';

/**
 * Computes the mean value of an array of values.
 * @param array - array of numbers
 * @param options - options
 */
export function xMean(
  array: NumberArray,
  options: XGetFromToIndexOptions = {},
): number {
  xCheck(array);
  const { fromIndex, toIndex } = xGetFromToIndex(array, options);

  let sumValue = array[fromIndex];

  for (let i = fromIndex + 1; i <= toIndex; i++) {
    sumValue += array[i];
  }
  return sumValue / (toIndex - fromIndex + 1);
}
