import { NumberArray } from 'cheminfo-types';

import { xCrossCorrelation } from './xCrossCorrelation';

export interface XAutoCorrelationOptions {
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
 * Calculates the auto-correlation of an array
 * @param A - the array for which to calculate the auto-correlation
 * @param options - Options
 */
export function xAutoCorrelation(
  A: NumberArray,
  options: XAutoCorrelationOptions = {},
): Float64Array {
  return xCrossCorrelation(A, A, options);
}
