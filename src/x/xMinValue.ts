import { DoubleArray } from 'cheminfo-types';

import { xCheck } from './xCheck';

/**
 * Computes the minimal value of an array of values
 *
 * @param array array of numbers
 * @param [options={}] options
 * @param [options.fromIndex=0] - First point for xyIntegration
 * @param [options.toIndex=x.length-1] - Last point for xyIntegration
 * @returns result
 */
export function xMinValue(
  array: DoubleArray | Uint16Array,
  options: {
    fromIndex?: number;
    toIndex?: number;
  } = {},
): number {
  xCheck(array);
  const { fromIndex = 0, toIndex = array.length - 1 } = options;
  let minValue = array[fromIndex];

  for (let i = fromIndex + 1; i <= toIndex; i++) {
    if (array[i] < minValue) {
      minValue = array[i];
    }
  }
  return minValue;
}
