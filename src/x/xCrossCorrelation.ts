import { NumberArray } from 'cheminfo-types';

import { xDotProduct } from './xDotProduct';

export interface XCrossCorrelationOptions {
  /**
   * sweep increment size (in number of points, min=1, max=A.length)
   * @default 1
   */
  tau?: number;

  /**
   * scalar lag parameter
   * @default A.length-1
   */
  lag?: number;
}

/**
 * Calculates the cross-correlation between 2 arrays
 * @param A - fixed array
 * @param B - sweeping array
 * @param options - Options
 */
export function xCrossCorrelation(
  A: NumberArray,
  B: NumberArray,
  options: XCrossCorrelationOptions = {},
): Float64Array {
  const { tau = 1, lag = A.length - 1 } = options;
  const result = new Float64Array(1 + (2 * lag) / tau);
  if (A.length === B.length) {
    const n = B.length;
    const g = new Float64Array(2 * n);
    const q = new Float64Array(2 * n);
    for (let i = 0; i < n; i++) {
      q[n + i] = B[i];
    }
    for (let i = n * 2 - (tau - 1); i > 0; i -= tau) {
      let k = 0;
      for (let j = i; j < n * 2; j++) {
        g[k] = q[j];
        k++;
      }
      const w = [];
      for (let l = 0; l < n; l++) {
        w[l] = g[l];
      }
      result[(k - (n - lag)) / tau] = xDotProduct(A, w);
    }
  }
  return result;
}
