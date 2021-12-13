import { DoubleArray } from 'cheminfo-types';

/**
 * This function returns an array with absolute values
 *
 * @param array array of number
 * @returns absolute array
 */
export function xAbsolute(array: DoubleArray): DoubleArray {
  let tmpArray = array.slice();
  for (let i = 0; i < tmpArray.length; i++) {
    if (tmpArray[i] < 0) tmpArray[i] *= -1;
  }

  return tmpArray;
}
