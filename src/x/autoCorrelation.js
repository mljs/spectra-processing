import { crossCorrelation } from './crossCorrelation';

/**
 * Calculates the auto-correlation of a vector
 * @param {Array} [A] - the array that will be fixed
 * @param {object} [options={}]
 * @param {number} [options.tau = 1] - displacement step size
 * @param {number} [options.lag = A.length - 1] - scalar lag parameter
 */

export function autoCorrelation(A, options = {}) {
  return crossCorrelation(A, A, options);
}
