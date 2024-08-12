import { NumberArray } from 'cheminfo-types';

import { xMean } from './xMean';
import { xRolling, XRollingOptions } from './xRolling';

/**
 * This function calculates a rolling average
 * @param array - array
 * @param options - option
 */
export function xRollingAverage(
  array: NumberArray,
  options: XRollingOptions = {},
): number[] {
  return xRolling(array, xMean, options);
}
