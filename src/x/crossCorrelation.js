import { dotProduct } from './dotProduct';

/**
 * Calculates the cross-correlation between 2 vectors
 * @param {Array} [A] - the array that will be fixed
 * @param {Array} [B]
 * @param {object} [options={}]
 * @param {number} [options.tau = 1]
 * @param {number} [options.lag = A.length - 1]
 */

export function crossCorrelation(A, B, options = {}) {
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
      result[(k - (n - lag)) / tau] = dotProduct(A, w);
    }
  }
  return result;
}
