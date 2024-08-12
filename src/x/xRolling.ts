import { NumberArray } from 'cheminfo-types';

import { xCheck } from './xCheck';
import { xPadding, XPaddingOptions } from './xPadding';

export interface XRollingOptions {
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
 * @param array - array
 * @param fct - callback function that from an array returns a value
 * @param options - options
 */
export function xRolling(
  array: NumberArray,
  fct?: (callbackArray: Float64Array) => number,
  options: XRollingOptions = {},
): number[] {
  xCheck(array);
  if (typeof fct !== 'function') {
    throw new TypeError('fct must be a function');
  }

  const { window = 5, padding = {} } = options;
  const { size = window - 1, algorithm, value } = padding;

  const padded = xPadding(array, { size, algorithm, value }); // ensure we get a copy and it is float64

  const newArray: number[] = [];
  for (let i = 0; i < padded.length - window + 1; i++) {
    // we will send a view to the original buffer
    newArray.push(fct(padded.subarray(i, i + window)));
  }

  return newArray;
}
