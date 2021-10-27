/**
 * This function returns an array with absolute values
 *
 * @param {Array<number>} array array of number
 * @returns {Array<number>} absolute array
 */
export function xAbsolute(
  array: number[] | Float64Array,
): number[] | Float64Array {
  let tmpArray = array.slice();
  for (let i = 0; i < tmpArray.length; i++) {
    if (tmpArray[i] < 0) tmpArray[i] *= -1;
  }

  return tmpArray;
}
