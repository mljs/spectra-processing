import { DoubleArray } from 'cheminfo-types';

import { xMinValue } from './xMinValue';
import { XPaddingOptions } from './xPadding';
import { xRolling } from './xRolling';

export interface XRollingMinOptions {
  /**
   * rolling window
   * @default 5
   */
  window?: number;
  /**
   * padding
   */
  padding?: XPaddingOptions;
}

/**
 * This function calculates a minimum within a rolling window
 *
 * @param array - array
 * @param options - options
 */
export function xRollingMin(
  array: DoubleArray,
  options: XRollingMinOptions = {},
): number[] {
  return xRolling(array, xMinValue, options);
}
