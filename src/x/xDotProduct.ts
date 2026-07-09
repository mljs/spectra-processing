import type { NumberArray } from 'cheminfo-types';

import { xCheckLengths } from './xCheckLengths.ts';

/**
 * Dot product between two arrays.
 * @param A - first array.
 * @param B - second array.
 */
export function xDotProduct(A: NumberArray, B: NumberArray): number {
  xCheckLengths(A, B);
  let result = 0;
  for (let i = 0; i < A.length; i++) {
    result += A[i] * B[i];
  }
  return result;
}
