import { xCheckLengths } from './xCheck';
/**
 * This function calculates the mean absolute error
 *
 * @param {Array<number>} array1 -first array
 * @param {Array<number>} array2 second array
 * @returns {number} result
 */
export function xMeanAbsoluteError(
  array1: number[] | Float64Array,
  array2: number[] | Float64Array,
): number {
  xCheckLengths(array1, array2);
  let sum = 0;
  for (let i = 0; i < array1.length; i++) {
    sum += Math.abs(array1[i] - array2[i]);
  }
  return sum / array1.length;
}
