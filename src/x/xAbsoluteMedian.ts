import { DoubleArray } from 'cheminfo-types';

import { xAbsolute } from './xAbsolute';
import { xMedian } from './xMedian';

/**
 * This function calculates the median after taking the reimAbsolute values of the points
 *
 * @param array - the array for which we want to calculate the absolute value
 * @returns - median
 */
export function xAbsoluteMedian(array: DoubleArray): number {
  return xMedian(xAbsolute(array));
}
