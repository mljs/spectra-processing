import { ArrayType } from '..';

import { xCheckLengths } from './xCheck';

/**
 * This function calculates the mean squared error
 *
 * @param {ArrayType} array1 -first array
 * @param {ArrayType} array2 second array
 * @returns {number} result
 */
export function xMeanSquaredError(
  array1: ArrayType,
  array2: ArrayType,
): number {
  xCheckLengths(array1, array2);
  let sum = 0;
  for (let i = 0; i < array1.length; i++) {
    sum += Math.pow(array1[i] - array2[i], 2);
  }
  return sum / array1.length;
}
