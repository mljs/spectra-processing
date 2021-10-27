import median from 'ml-array-median';

import { xAbsolute } from './xAbsolute';
/**
 * This function calculates the median after taking the reimAbsolute values of the points
 *
 * @param {Array<number>} array - the array that will be rotated
 * @returns {number} median
 */
export function xAbsoluteMedian(array: number[] | Float64Array): number {
  return median(xAbsolute(array));
}
