import { NumberArray } from 'cheminfo-types';

/**
 * This function calculate the norm of a vector.
 * @example xNorm([3, 4]) -> 5
 * @param array - array
 * @returns - calculated norm
 */
export function xNorm(array: NumberArray): number {
  let result = 0;
  for (const element of array) {
    result += element ** 2;
  }
  return Math.sqrt(result);
}
