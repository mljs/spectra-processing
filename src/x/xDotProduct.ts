import { ArrayType } from '..';

import { xMultiply } from './xMultiply';

/**
 * XDotProduct.
 *
 * @param A - First array.
 * @param B - Second array.
 * @returns Result.
 */
export function xDotProduct(A: ArrayType, B: ArrayType): number {
  let g = xMultiply(A, B);
  let result = 0;
  for (let i = 0; i < A.length; i++) {
    result += g[i];
  }
  return result;
}
