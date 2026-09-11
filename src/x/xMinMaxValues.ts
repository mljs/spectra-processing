import type { NumberArray } from 'cheminfo-types';

import { xCheck } from './xCheck.ts';

/**
 * Return min and max values of an array.
 * @param array - array of number
 * @returns object with 2 properties, min and max.
 */
export function xMinMaxValues(array: NumberArray): {
  min: number;
  max: number;
} {
  xCheck(array);

  let min = array[0];
  let max = array[0];

  for (let i = 1; i < array.length; i++) {
    const value = array[i];
    if (value < min) min = value;
    else if (value > max) max = value;
  }

  return { min, max };
}
