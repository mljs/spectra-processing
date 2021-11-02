import { ArrayType } from '..';

import { xCheck } from './xCheck';

/**.
 * Computes the maximal value of an array of values
 *
 * @param array array of numbers
 * @param [options={}] options
 * @param [options.fromIndex=0] - First point for xyIntegration
 * @param [options.toIndex=x.length-1] - Last point for xyIntegration
 * @returns result
 */
export function xMean(
  array: ArrayType,
  options: {
    fromIndex?: number;
    toIndex?: number;
  } = {},
): number {
  xCheck(array);
  const { fromIndex = 0, toIndex = array.length - 1 } = options;
  let sumValue = array[fromIndex];

  for (let i = fromIndex + 1; i <= toIndex; i++) {
    sumValue += array[i];
  }
  return sumValue / (toIndex - fromIndex + 1);
}
