import { DoubleArray } from 'cheminfo-types';

/**
 * This function calculate the norm of a vector
 *
 * @example xNorm([3, 4]) -> 5
 * @param array - array
 * @returns - calculated norm
 */
export function xNorm(array: DoubleArray): number {
  let result = 0;
  array.forEach((element) => {
    result += element ** 2;
  });
  return Math.sqrt(result);
}
