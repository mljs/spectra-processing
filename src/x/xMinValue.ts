import { ArrayType } from '..';

import { xCheck } from './xCheck';

/**
 * Computes the minimal value of an array of values
 *
 * @param {ArrayType} array array of numbers
 * @param {{fromIndex?: number,toIndex?: number}} [options={}] options
 * @param {number} [options.fromIndex=0] - First point for xyIntegration
 * @param {number} [options.toIndex=x.length-1] - Last point for xyIntegration
 * @returns {number} result
 */
export function xMinValue(
  array: ArrayType,
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
