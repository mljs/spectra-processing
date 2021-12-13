import { DoubleArray } from 'cheminfo-types';
import mean from 'ml-array-mean';

import { xRolling } from './xRolling';

/**
 * This function calculates a rolling average
 *
 * @param array - the array that will be rotated
 * @param [options={}] options
 * @param [options.window=5] rolling window
 * @param [options.padding.size=window-1] none, value, circular, duplicate
 * @param [options.padding.algorithm=''] none, value, circular, duplicate
 * @param [options.padding.value=0] value to use for padding (if algorithm='value')
 * @param options.padding padding
 * @returns result
 */
export function xRollingAverage(array: DoubleArray, options = {}): DoubleArray {
  return xRolling(array, mean, options);
}
