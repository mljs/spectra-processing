import { xCrossCorrelation } from './xCrossCorrelation';

/**
 * Calculates the auto-correlation of a vector
 *
 * @param {Array<number>} [A] - the array that will be fixed
 * @param {object} [options={}]
 * @param {number} [options.tau=1] - sweep increment size (in number of points, min=1, max=A.length)
 * @param {number} [options.lag=A.length - 1] - scalar lag parameter
 */

/**
 * @param {number[]} A number array
 * @param {{tau?:number, lag?:number}} options options
 * @returns {number[]} result
 */
export function xAutoCorrelation(
  A: number[] | Float64Array,
  options = {},
): number[] | Float64Array {
  return xCrossCorrelation(A, A, options);
}
