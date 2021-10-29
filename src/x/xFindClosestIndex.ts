/**
 * Returns the closest index of a `target` in an ordered array
 *
 * @param {Array<number>} array
 * @param {number} target
 */

/**
 * @param {Array<number>} array array of number
 * @param {number} target number
 * @returns {number} closest index
 */
export function xFindClosestIndex(
  array: number[] | Float64Array | Float32Array | Uint16Array,
  target: number,
): number {
  let low = 0;
  let high = array.length - 1;
  let middle = 0;
  while (high - low > 1) {
    middle = low + ((high - low) >> 1);
    if (array[middle] < target) {
      low = middle;
    } else if (array[middle] > target) {
      high = middle;
    } else {
      return middle;
    }
  }

  if (low < array.length - 1) {
    if (Math.abs(target - array[low]) < Math.abs(array[low + 1] - target)) {
      return low;
    } else {
      return low + 1;
    }
  } else {
    return low;
  }
}
