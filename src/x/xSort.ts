import { DoubleArray } from 'cheminfo-types';

/** Function that sorts arrays or Float64Arrays in ascending order
 *
 * @param array - array to sort
 * @returns sorted array
 */
export function xSortAscending(array: DoubleArray) {
  if (array instanceof Float64Array) {
    return array.sort();
  } else if (array instanceof Array) {
    return array.sort((a, b) => a - b);
  }
}

/** Function that sorts arrays or Float64Arrays in descending order
 *
 * @param array - array to sort
 * @returns sorted array
 */
export function xSortDescending(array: DoubleArray) {
  if (array instanceof Float64Array) {
    return array.sort().reverse();
  } else if (array instanceof Array) {
    return array.sort((a, b) => b - a);
  }
}
