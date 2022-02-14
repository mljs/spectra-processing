import { NumberArray } from 'cheminfo-types';

import { xCheck } from './xCheck';
/**
 * Computes the index of the maximum of the given values
 *
 * @param array - array of numbers
 * @returns - index
 */
export function xMaxIndex(array: NumberArray): number {
  xCheck(array);

  let maxIndex = 0;

  for (let i = 1; i < array.length; i++) {
    if (array[i] > array[maxIndex]) {
      maxIndex = i;
    }
  }
  return maxIndex;
}
