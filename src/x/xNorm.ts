import type { NumberArray } from 'cheminfo-types';

/**
 * This function calculate the norm of a vector.
 * @example xNorm([3, 4]) -> 5
 * @param array - array
 * @returns - calculated norm
 */
export function xNorm(array: NumberArray): number {
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    result += element * element;
  }
  return Math.sqrt(result);
}
