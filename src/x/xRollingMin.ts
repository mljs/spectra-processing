import { DoubleArray } from 'cheminfo-types';

import { xMinValue } from './xMinValue';
import { xRolling } from './xRolling';

/**
 * This function calculates a minimum within a rolling window
 *
 * @param array - array
 * @param options - options
 */
export function xRollingMin(
  array: DoubleArray,
  options: {
    /**
     * rolling window
     * @default 5
     */
    window?: number;
    /**
     * padding
     */
    padding?: {
      /**
       * padding size before first element and after last element
       * @default window-1
       */
      size?: number;
      /**
       * value to use for padding (if algorithm='value')
       * @default 0
       */
      value?: number;
      /**
       * '', value, circular, duplicate
       * @default ''
       */
      algorithm?: string;
    };
  } = {},
): DoubleArray {
  return xRolling(array, xMinValue, options);
}
