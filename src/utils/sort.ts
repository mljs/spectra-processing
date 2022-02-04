/** Function that sorts arrays or Float64Arrays/Float32Arrays in ascending order
 * @param array - array to sort
 * @returns sorted array
 */
export function sortAscending(array: any) {
  if (array instanceof Float32Array || array instanceof Float64Array) {
    return array.sort();
  } else if (array instanceof Array) {
    return array.sort((a, b) => (a > b ? 1 : -1));
  }
}

/** Function that sorts arrays or Float64Arrays/Float32Arrays in descending order
 * @param array - array to sort
 * @returns sorted array
 */
export function sortDescending(array: any) {
  if (array instanceof Float32Array || array instanceof Float64Array) {
    return array.sort().reverse();
  } else if (array instanceof Array) {
    return array.sort((a, b) => (a > b ? -1 : 1));
  }
}
