import { ArrayType } from '..';

import { xCheck } from './xCheck';
import { xPadding } from './xPadding';
/**.
 * This function calculates a rolling average
 *
 * @param array - the array that will be rotated
 * @param fct callback function that from an array returns a value.
 * @param [options={}] options
 * @param [options.window=5] rolling window
 * @param [options.padding.size=0] none, value, circular, duplicate
 * @param [options.padding.algorithm='value'] none, value, circular, duplicate
 * @param [options.padding.value=0] value to use for padding (if algorithm='value')
 * @param options.padding padding
 * @returns result
 */
export function xRolling(
  array: ArrayType,
  fct?: (array: ArrayType) => number,
  options: {
    window?: number;
    padding?: { size?: number; algorithm?: string; value?: number };
  } = {},
): ArrayType {
  xCheck(array);
  if (typeof fct !== 'function') throw Error('fct has to be a function');

  const { window = 5, padding = {} } = options;
  const { size = window - 1, algorithm, value } = padding;

  array = xPadding(array, { size, algorithm, value }); // ensure we get a copy and it is float64

  const newArray = [];
  for (let i = 0; i < array.length - window + 1; i++) {
    let subArray = new Float64Array(
      (array as Float64Array).buffer,
      i * 8,
      window,
    );
    // we will send a view to the original buffer
    newArray.push(fct(subArray));
  }

  return newArray;
}
