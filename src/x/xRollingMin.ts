import { DoubleArray } from 'cheminfo-types';

import { xMinValue } from './xMinValue';
import { xRolling, XRollingOptions } from './xRolling';

/**
 * This function calculates a minimum within a rolling window
 *
 * @param array - array
 * @param options - options
 */
export function xRollingMin(
  array: DoubleArray,
  options: XRollingOptions = {},
): number[] {
  return xRolling(array, xMinValue, options);
}
