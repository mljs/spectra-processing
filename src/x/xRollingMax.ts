import { DoubleArray } from 'cheminfo-types';
import max from 'ml-array-max';

import { xRolling } from './xRolling';

/**
 * This function calculates a maximum within a rolling window
 *
 * @param array - the array that will be rotated
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
  return xRolling(array, max, options);
}
