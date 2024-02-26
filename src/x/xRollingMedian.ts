import { DoubleArray } from 'cheminfo-types';

import { xMedian } from './xMedian';
import { XPaddingOptions } from './xPadding';
import { xRolling } from './xRolling';

export interface XRollingMedianOptions {
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
 * @param options - options
 */
export function xRollingMedian(
  array: DoubleArray,
  options: XRollingMedianOptions = {},
): number[] {
  return xRolling(array, xMedian, options);
}
