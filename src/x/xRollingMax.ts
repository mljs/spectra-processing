import max from 'ml-array-max';

import { xRolling } from './xRolling';

/**
 * This function calculates a maximum within a rolling window
 *
 * @param {Array<number>} array - the array that will be rotated
 * @param {object} [options={}] options
 * @param {number} [options.window=5] rolling window
 * @param {string} [options.padding.size=window-1] none, value, circular, duplicate
 * @param {string} [options.padding.algorithm=''] none, value, circular, duplicate
 * @param {number} [options.padding.value=0] value to use for padding (if algorithm='value')
 * @returns {Array<number>} results
 */
export function xRollingMax(
  array: number[] | Float64Array | Float32Array | Uint16Array,
  options = {},
): number[] | Float64Array | Float32Array | Uint16Array {
  return xRolling(array, max, options);
}
