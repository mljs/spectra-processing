import { DoubleArray } from 'cheminfo-types';

import { xMedian } from './xMedian';
import { xRolling } from './xRolling';

/**
 * This function calculates a rolling average
 *
 * @param array - array
 * @param options - options
 */
export function xRollingMedian(
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
  return xRolling(array, xMedian, options);
}
