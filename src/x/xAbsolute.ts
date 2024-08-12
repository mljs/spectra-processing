import { NumberArray } from 'cheminfo-types';

/**
 * This function returns an array with absolute values.
 * @param array - array of data
 * @returns - array with absolute values
 */
export function xAbsolute<ArrayType extends NumberArray = NumberArray>(
  array: ArrayType,
): ArrayType {
  const tmpArray = array.slice() as ArrayType;
  for (let i = 0; i < tmpArray.length; i++) {
    if (tmpArray[i] < 0) tmpArray[i] *= -1;
  }
  return tmpArray;
}
