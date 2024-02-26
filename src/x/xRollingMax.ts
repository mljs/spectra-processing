import { DoubleArray } from 'cheminfo-types';

import { xMaxValue } from './xMaxValue';
import { XPaddingOptions } from './xPadding';
import { xRolling } from './xRolling';

export interface XRollingMaxOptions {
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
 * This function calculates a maximum within a rolling window
 *
 * @param array - array
 * @param options - options
 */
export function xRollingMax(
  array: DoubleArray,
  options: XRollingMaxOptions = {},
): number[] {
  return xRolling(array, xMaxValue, options);
}
