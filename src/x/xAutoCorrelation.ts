import { ArrayType } from '..';

import { xCrossCorrelation } from './xCrossCorrelation';

/**
 * Calculates the auto-correlation of a vector
 *
 * @param {ArrayType} [A] - the array that will be fixed
 * @param {object} [options={}] Options
 * @param {number} [options.tau=1] - sweep increment size (in number of points, min=1, max=A.length)
 * @param {number} [options.lag=A.length - 1] - scalar lag parameter
 * @returns {ArrayType} result
 */
export function xAutoCorrelation(A: ArrayType, options = {}): ArrayType {
  return xCrossCorrelation(A, A, options);
}
