import type { NumberArray } from 'cheminfo-types';

import { xAbsolute } from './xAbsolute.ts';
import { xMedian } from './xMedian.ts';

/**
 * This function calculates the median after taking the xAbsolute values of the points.
 * @param array - the array for which we want to calculate the absolute value
 * @returns - median
 */
export function xAbsoluteMedian(array: NumberArray): number {
  return xMedian(xAbsolute(array));
}
