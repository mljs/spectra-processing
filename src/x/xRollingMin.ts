import type { NumberArray } from 'cheminfo-types';

import { xMinValue } from './xMinValue';
import type { XRollingOptions } from './xRolling';
import { xRolling } from './xRolling';

/**
 * This function calculates a minimum within a rolling window
 * @param array - array
 * @param options - options
 */
export function xRollingMin(
  array: NumberArray,
  options: XRollingOptions = {},
): number[] {
  return xRolling(array, xMinValue, options);
}
