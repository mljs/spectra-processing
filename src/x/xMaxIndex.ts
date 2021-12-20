import { DoubleArray } from 'cheminfo-types';

import { xCheck } from './xCheck';
/**
 * Computes the index of the maximum of the given values
 *
 * @param array - array of numbers
 * @returns - indexe
 */
export function xMaxIndex(array: DoubleArray | Uint16Array): number {
  xCheck(array);

  let maxIndex = 0;

  for (let i = 1; i < array.length; i++) {
    if (array[i] > array[maxIndex]) {
      maxIndex = i;
    }
  }
  return maxIndex;
}
