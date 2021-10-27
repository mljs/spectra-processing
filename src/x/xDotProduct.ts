import { xMultiply } from './xMultiply';

/**
 * @param {number[]} A first array
 * @param {number[]} B second array
 * @returns {number} result
 */
export function xDotProduct(
  A: number[] | Float64Array,
  B: number[] | Float64Array,
): number {
  let g = xMultiply(A, B);
  let result = 0;
  for (let i = 0; i < A.length; i++) {
    result += g[i];
  }
  return result;
}
