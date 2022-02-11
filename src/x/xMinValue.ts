import { NumberArray } from 'cheminfo-types';

import { xCheck } from './xCheck';

/**
 * Computes the minimal value of an array of values
 *
 * @param array - array of numbers
 * @param options - options
 */
export function xMinValue(
  array: NumberArray,
  options: {
    /**
     * First point for xyIntegration
     * @default 0
     */
    fromIndex?: number;
    /**
     * Last point for xyIntegration
     * @default x.length-1
     */
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
