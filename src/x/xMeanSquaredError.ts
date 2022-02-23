import { DoubleArray } from 'cheminfo-types';

import { xCheckLengths } from './xCheckLengths';

/**
 * This function calculates the mean squared error
 *
 * @param array1 -first array
 * @param array2 - second array
 */
export function xMeanSquaredError(
  array1: DoubleArray,
  array2: DoubleArray,
): number {
  xCheckLengths(array1, array2);
  let sum = 0;
  for (let i = 0; i < array1.length; i++) {
    sum += Math.pow(array1[i] - array2[i], 2);
  }
  return sum / array1.length;
}
