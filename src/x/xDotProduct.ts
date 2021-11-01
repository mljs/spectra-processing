import { ArrayType } from '..';

import { xMultiply } from './xMultiply';

/**
 * @param {ArrayType} A first array
 * @param {ArrayType} B second array
 * @returns {number} result
 */
export function xDotProduct(A: ArrayType, B: ArrayType): number {
  let g = xMultiply(A, B);
  let result = 0;
  for (let i = 0; i < A.length; i++) {
    result += g[i];
  }
  return result;
}
