import { ArrayType } from '..';

/**
 * This function returns an array with absolute values
 *
 * @param {ArrayType} array array of number
 * @returns {ArrayType} absolute array
 */
export function xAbsolute(array: ArrayType): ArrayType {
  let tmpArray = array.slice();
  for (let i = 0; i < tmpArray.length; i++) {
    if (tmpArray[i] < 0) tmpArray[i] *= -1;
  }

  return tmpArray;
}
