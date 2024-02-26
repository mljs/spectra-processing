import { DoubleArray } from 'cheminfo-types';

import { xMean } from './xMean';
import { XPaddingOptions } from './xPadding';
import { xRolling } from './xRolling';

export interface XRollingAverageOptions {
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
 * This function calculates a rolling average
 *
 * @param array - array
 * @param options - option
 */
export function xRollingAverage(
  array: DoubleArray,
  options: XRollingAverageOptions = {},
): number[] {
  return xRolling(array, xMean, options);
}
