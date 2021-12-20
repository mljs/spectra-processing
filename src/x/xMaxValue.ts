import { DoubleArray } from 'cheminfo-types';

import { xCheck } from './xCheck';

/**
 * Computes the maximal value of an array of values
 *
 * @param array - array of number
 * @param options - options
 */
export function xMaxValue(
  array: DoubleArray | Uint16Array,
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
  let maxValue = array[fromIndex];

  for (let i = fromIndex + 1; i <= toIndex; i++) {
    if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }
  return maxValue;
}
