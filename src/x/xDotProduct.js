import { xMultiply } from './xMultiply';

/**
 * @param A
 * @param B
 */
export function xDotProduct(A, B) {
  let g = xMultiply(A, B);
  let result = 0;
  for (let i = 0; i < A.length; i++) {
    result += g[i];
  }
  return result;
}
