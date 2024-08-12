import { NumberArray } from 'cheminfo-types';

import { xMultiply } from './xMultiply';

/**
 * Dot product between two arrays.
 * @param A - First array.
 * @param B - Second array.
 */
export function xDotProduct(A: NumberArray, B: NumberArray): number {
  const g = xMultiply(A, B);
  let result = 0;
  for (let i = 0; i < A.length; i++) {
    result += g[i];
  }
  return result;
}
