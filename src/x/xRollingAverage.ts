import type { NumberArray } from 'cheminfo-types';

import { xMean } from './xMean.ts';
import type { XRollingOptions } from './xRolling.ts';
import { xRolling } from './xRolling.ts';

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
