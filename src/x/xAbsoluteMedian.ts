import { DoubleArray } from 'cheminfo-types';
import median from 'ml-array-median';

import { xAbsolute } from './xAbsolute';
/**
 * This function calculates the median after taking the reimAbsolute values of the points
 *
 * @param array - the array that will be rotated
 * @returns median
 */
export function xAbsoluteMedian(array: DoubleArray): number {
  return median(xAbsolute(array));
}
