import { DoubleArray } from 'cheminfo-types';
import min from 'ml-array-min';

import { xRolling } from './xRolling';

/**
 * This function calculates a minimum within a rolling window
 *
 * @param array - the array that will be rotated
 * @param [options={}] options
 * @param [options.window=5] rolling window
 * @param [options.padding.size=window-1] none, value, circular, duplicate
 * @param [options.padding.algorithm=''] none, value, circular, duplicate
 * @param [options.padding.value=0] value to use for padding (if algorithm='value')
 * @returns results
 */
export function xRollingMin(array: DoubleArray, options = {}): DoubleArray {
  return xRolling(array, min, options);
}
