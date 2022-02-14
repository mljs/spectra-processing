import { DoubleArray } from 'cheminfo-types';

import { xDotProduct } from './xDotProduct';

/**
 * Calculates the cross-correlation between 2 arrays
 *
 * @param A - fixed array
 * @param B - sweeping array
 * @param options - Options
 */
export function xCrossCorrelation(
  A: DoubleArray,
  B: DoubleArray,
  options: {
    /**
     * sweep increment size (in number of points, min=1, max=A.length)
     * @default 1
     * */
    tau?: number;
    /**
     * scalar lag parameter
     * @default A.length-1
     * */
    lag?: number;
  } = {},
): Float64Array {
  let { tau = 1, lag = A.length - 1 } = options;
  let result = new Float64Array(1 + (2 * lag) / tau);
  if (A.length === B.length) {
    let n = B.length;
    let g = new Float64Array(2 * n);
    let q = new Float64Array(2 * n);
    for (let i = 0; i < n; i++) {
      q[n + i] = B[i];
    }
    for (let i = n * 2 - (tau - 1); i > 0; i -= tau) {
      let k = 0;
      for (let j = i; j < n * 2; j++) {
        g[k] = q[j];
        k++;
      }
      let w = [];
      for (let l = 0; l < n; l++) {
        w[l] = g[l];
      }
      result[(k - (n - lag)) / tau] = xDotProduct(A, w);
    }
  }
  return result;
}
