import { ArrayType } from '..';

/**
 * This function calculate the norm of a vector
 *
 * @example xNorm([3, 4]) -> 5
 * @param array - the array that will be rotated
 * @returns calculated norm
 */
export function xNorm(array: ArrayType): number {
  let result = 0;
  array.forEach((element) => {
    result += element ** 2;
  });
  return Math.sqrt(result);
}
