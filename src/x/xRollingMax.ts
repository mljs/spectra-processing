import { NumberArray } from 'cheminfo-types';

import { xMaxValue } from './xMaxValue';
import { xRolling, XRollingOptions } from './xRolling';

/**
 * This function calculates a maximum within a rolling window
 * @param array - array
 * @param options - options
 */
export function xRollingMax(
  array: NumberArray,
  options: XRollingOptions = {},
): number[] {
  return xRolling(array, xMaxValue, options);
}
