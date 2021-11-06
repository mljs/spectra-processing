import max from 'ml-array-max';

import { ArrayType } from '..';

import { xRolling } from './xRolling';

/**
 * This function calculates a maximum within a rolling window
 *
 * @param array - the array that will be rotated
 * @param [options={}] options
 * @param [options.window=5] rolling window
 * @param [options.padding.size=window-1] none, value, circular, duplicate
 * @param [options.padding.algorithm=''] none, value, circular, duplicate
 * @param [options.padding.value=0] value to use for padding (if algorithm='value')
 * @returns results
 */
export function xRollingMax(array: ArrayType, options = {}): ArrayType {
  return xRolling(array, max, options);
}
