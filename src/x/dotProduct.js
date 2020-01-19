import { multiply } from './multiply';

export function dotProduct(A, B) {
  let g = multiply(A, B);
  let result = 0;
  for (let i = 0; i < A.length; i++) {
    result += g[i];
  }
  return result;
}
