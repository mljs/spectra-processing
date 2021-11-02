import median from 'ml-array-median';

import { ArrayType } from '..';

import { xAbsolute } from './xAbsolute';
/**.
 * This function calculates the median after taking the reimAbsolute values of the points
 *
 * @param array - the array that will be rotated
 * @returns median
 */
export function xAbsoluteMedian(array: ArrayType): number {
  return median(xAbsolute(array));
}
