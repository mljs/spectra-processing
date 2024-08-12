import { NumberArray } from 'cheminfo-types';

import { xCheck } from './xCheck';

/**
 * Return min and max values of an array.
 * @param array - array of number
 * @returns - Object with 2 properties, min and max
 */
export function xMinMaxDelta(array: NumberArray): {
  min: number;
  max: number;
} {
  xCheck(array, {
    minLength: 2,
  });

  let minDelta = array[1] - array[0];
  let maxDelta = minDelta;

  for (let i = 0; i < array.length - 1; i++) {
    const delta = array[i + 1] - array[i];
    if (delta < minDelta) minDelta = delta;
    if (delta > maxDelta) maxDelta = delta;
  }

  return { min: minDelta, max: maxDelta };
}
