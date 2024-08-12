import { NumberArray } from 'cheminfo-types';

import { xCheck } from './xCheck';

/**
 * Return min and max values of an array.
 * @param array - array of number
 * @returns - Object with 2 properties, min and max
 */
export function xMinMaxValues(array: NumberArray): {
  min: number;
  max: number;
} {
  xCheck(array);

  let min = array[0];
  let max = array[0];

  for (const value of array) {
    if (value < min) min = value;
    if (value > max) max = value;
  }

  return { min, max };
}
