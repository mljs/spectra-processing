import { DoubleArray } from 'cheminfo-types';

import { xCheck } from './xCheck';
import { xPadding } from './xPadding';

/**
 * This function calculates a rolling average
 *
 * @param array - array
 * @param fct - callback function that from an array returns a value
 * @param options - options
 */
export function xRolling(
  array: DoubleArray,
  fct?: (array: DoubleArray) => number,
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
       * @default 0
       */
      size?: number;
      /**
       * value to use for padding (if algorithm='value')
       * @default 0
       */
      value?: number;
      /**
       * '', value, circular, duplicate
       * @default 'value'
       */
      algorithm?: string;
    };
  } = {},
): DoubleArray {
  xCheck(array);
  if (typeof fct !== 'function') throw Error('fct has to be a function');

  const { window = 5, padding = {} } = options;
  const { size = window - 1, algorithm, value } = padding;

  array = xPadding(array, { size, algorithm, value }); // ensure we get a copy and it is float64

  const newArray = [];
  for (let i = 0; i < array.length - window + 1; i++) {
    let subArray = new Float64Array(array.buffer, i * 8, window);
    // we will send a view to the original buffer
    newArray.push(fct(subArray));
  }

  return newArray;
}
