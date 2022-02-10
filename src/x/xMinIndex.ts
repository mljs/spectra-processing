import { NumberArray } from 'cheminfo-types';

import { xCheck } from './xCheck';

/**
 * Computes the index of the minimum of the given values
 *
 * @param array - array of numbers
 */
export function xMinIndex(array: NumberArray): number {
  xCheck(array);
  let minIndex = 0;
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[minIndex]) {
      minIndex = i;
    }
  }
  return minIndex;
}
