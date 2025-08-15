import type { NumberArray } from 'cheminfo-types';

import { xMedian } from './xMedian.ts';
import type { XRollingOptions } from './xRolling.ts';
import { xRolling } from './xRolling.ts';

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
