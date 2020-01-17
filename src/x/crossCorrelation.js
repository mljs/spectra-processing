import { multiply } from './multiply';

/**
 * Calculates the cross-correlation between 2 vectors
 * @param {Array} [A] - the array that will be fixed
 * @param {Array} [B]
 * @return {Array}
 */
// let multiply = SP.X.multiply;

export function crossCorrelation(fun1, fun2, options = {}) {
  let { tau, lag } = options;
  if (tau === undefined) {
    tau = 1;
  }
  if (lag === undefined) {
    lag = fun1.length;
  }
  if (!fun2) {
    fun2 = fun1;
  }
  if (fun2.tau) {
    tau = fun2.tau;
    lag = fun2.lag;
    fun2 = fun1;
  }
  let result = [];
  if (fun1.length === fun2.length) {
    let n = fun2.length;
    let mlag = n - lag;
    let g = new Array(2 * n).fill(0);
    let q = new Array(n).fill(0).concat(fun2);
    for (let i = n * 2 - 1 - mlag; i > mlag; i -= tau) {
      let k = 0;
      for (let j = i; j < n * 2; j++) {
        g[k] = q[j];
        k++;
      }
      result.push(multiply(fun1, g.slice(0, n)).reduce((a, b) => a + b));
    }
  }
  return result;
}
