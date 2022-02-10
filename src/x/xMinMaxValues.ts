import { NumberArray } from 'cheminfo-types';

import { xCheck } from './xCheck';

/**
 * Return min and max values of an array
 *
 * @param array - array of number
 * @returns - Object with 2 properties, min and max
 */
export function xMinMaxValues(array: NumberArray): {
  min: number;
  max: number;
} {
  xCheck(array);

  let min = array[0] as number;
  let max = array[0] as number;

  for (let value of array) {
    if (value < min) min = value as number;
    if (value > max) max = value as number;
  }

  return { min, max };
}
