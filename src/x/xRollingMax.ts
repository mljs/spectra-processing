import max from 'ml-array-max';

import { ArrayType } from '..';

import { xRolling } from './xRolling';

/**
 * This function calculates a maximum within a rolling window
 *
 * @param {ArrayType} array - the array that will be rotated
 * @param {{window?: number, padding?: { size?: number, algorithm?: string, value?: number }}} [options={}] options
 * @param {number} [options.window=5] rolling window
 * @param {string} [options.padding.size=window-1] none, value, circular, duplicate
 * @param {string} [options.padding.algorithm=''] none, value, circular, duplicate
 * @param {number} [options.padding.value=0] value to use for padding (if algorithm='value')
 * @returns {ArrayType} results
 */
export function xRollingMax(array: ArrayType, options = {}): ArrayType {
  return xRolling(array, max, options);
}
