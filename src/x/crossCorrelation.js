import { multiply } from './multiply';

/**
 * Calculates the cross-correlation between 2 vectors
 * @param {Array} [A] - the array that will be fixed
 * @param {Array} [B]
 * @return {Array}
 */

export function crossCorrelation(A, B, options = {}) {
  if (!Object.keys(options).length !== 0) {
    var { tau = 1, lag = A.length - 1 } = options;
  }
  let result = [];
  if (A.length === B.length) {
    let n = B.length;
    let mlag = (n - lag - 1);
    let g = new Array(2 * n).fill(0);
    let q = new Array(n).fill(0).concat(B);
    for (let i = n * 2 - 1 - mlag; i > mlag; i -= tau) {
      let k = 0;
      for (let j = i; j < n * 2; j++) {
        g[k] = q[j];
        k++;
      }
      result.push(
        multiply(A, g.slice(0, n))
          .reduce((a, b) => a + b)
      );
    }
  }
  return result;
}
