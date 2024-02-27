import { DoubleArray } from 'cheminfo-types';

/** Function that sorts arrays or Float64Arrays in descending order
 *
 * @param array - array to sort
 * @returns sorted array
 */
export function xSortDescending<ArrayType extends DoubleArray>(
  array: ArrayType,
): ArrayType {
  if (array instanceof Float64Array) {
    return array.sort().reverse() as ArrayType;
  } else if (Array.isArray(array)) {
    return array.sort((a, b) => b - a) as ArrayType;
  }
  throw new Error('trying to sort non array');
}
