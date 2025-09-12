import type { NumberArray } from 'cheminfo-types';

/**
 * Function that sorts arrays or Float64Arrays in descending order
 * @param array - array to sort
 * @returns sorted array
 */
export function xSortDescending<ArrayType extends NumberArray>(
  array: ArrayType,
): ArrayType {
  if (ArrayBuffer.isView(array)) {
    array.sort();
    array.reverse();
    return array;
  } else if (Array.isArray(array)) {
    array.sort((a, b) => b - a);
    return array;
  }
  throw new Error('trying to sort non array');
}
