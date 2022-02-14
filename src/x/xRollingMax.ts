import { DoubleArray } from 'cheminfo-types';

import { xMaxValue } from './xMaxValue';
import { xRolling } from './xRolling';

/**
 * This function calculates a maximum within a rolling window
 *
 * @param array - array
 * @param options - options
 */
export function xRollingMax(
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
  return xRolling(array, xMaxValue, options);
}
