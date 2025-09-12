import type { NumberArray } from 'cheminfo-types';

/**
 * Function that sorts arrays or Float64Arrays in ascending order in place !
 * This method is optimized for typed arrays.
 * @param array - array to sort
 * @returns sorted array
 */

export function xSortAscending<ArrayType extends NumberArray>(
  array: ArrayType,
): ArrayType {
  if (ArrayBuffer.isView(array)) {
    array.sort();
    return array;
  } else if (Array.isArray(array)) {
    array.sort((a, b) => a - b);
    return array;
  }
  throw new Error('trying to sort non array');
}
