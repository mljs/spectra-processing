import { DoubleArray } from 'cheminfo-types';

import { xCrossCorrelation } from './xCrossCorrelation';

/**
 * Calculates the auto-correlation of an array
 *
 * @param A - the array for which to calculate the auto-correlation
 * @param options - Options
 */
export function xAutoCorrelation(
  A: DoubleArray,
  options: {
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
  } = {},
): DoubleArray {
  return xCrossCorrelation(A, A, options);
}
