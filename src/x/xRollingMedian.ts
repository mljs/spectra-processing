import { NumberArray } from 'cheminfo-types';

import { xMedian } from './xMedian';
import { xRolling, XRollingOptions } from './xRolling';

/**
 * This function calculates a rolling average
 * @param array - array
 * @param options - options
 */
export function xRollingMedian(
  array: NumberArray,
  options: XRollingOptions = {},
): number[] {
  return xRolling(array, xMedian, options);
}
