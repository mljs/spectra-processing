import { DoubleArray } from 'cheminfo-types';

import { xAbsolute } from './xAbsolute';
import { xMedian } from './xMedian';

/**
 * This function calculates the median after taking the reimAbsolute values of the points
 *
 * @param array - the array that will be rotated
 * @returns - median
 */
export function xAbsoluteMedian(array: DoubleArray): number {
  return xMedian(xAbsolute(array));
}
