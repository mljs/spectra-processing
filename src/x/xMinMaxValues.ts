import { ArrayType } from '..';

import { xCheck } from './xCheck';

/**
import { xCheck } from './xCheck';
 * return min and max values of an array
 *
 * @param {ArrayType} array array of number
 * @returns { {min: number,max: number}} Object with 2 properties, min and max
 */
export function xMinMaxValues(array: ArrayType): {
  min: number;
  max: number;
} {
  xCheck(array);

  let min = array[0];
  let max = array[0];

  for (let value of array) {
    if (value < min) min = value;
    if (value > max) max = value;
  }

  return { min, max };
}
