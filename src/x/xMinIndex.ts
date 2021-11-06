import { ArrayType } from '..';

import { xCheck } from './xCheck';

/**
 * Computes the index of the minimum of the given values
 *
 * @param array array of numbers
 * @returns result
 */
export function xMinIndex(array: ArrayType): number {
  xCheck(array);
  let minIndex = 0;
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[minIndex]) {
      minIndex = i;
    }
  }
  return minIndex;
}
