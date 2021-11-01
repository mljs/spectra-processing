import mean from 'ml-array-mean';

import { ArrayType } from '..';

import { xRolling } from './xRolling';

/**
 * This function calculates a rolling average
 *
 * @param {ArrayType} array - the array that will be rotated
 * @param {{window?: number, padding?: { size?: number, algorithm?: string, value?: number }}} [options={}] options
 * @param {number} [options.window=5] rolling window
 * @param {string} [options.padding.size=window-1] none, value, circular, duplicate
 * @param {string} [options.padding.algorithm=''] none, value, circular, duplicate
 * @param {number} [options.padding.value=0] value to use for padding (if algorithm='value')
 * @param {{ size?: number; algorithm?: string; value?: number }}options.padding padding
 * @returns {ArrayType} result
 */
export function xRollingAverage(array: ArrayType, options = {}): ArrayType {
  return xRolling(array, mean, options);
}
