/**
 * Returns the closest index of a `target`
 *
 * @param {Array<number>} array
 * @param {number} target
 */

/**
 * @param array
 * @param target
 */
export function xFindClosestIndex(array, target, options = {}) {
  const { sorted = true } = options;
  if (sorted) {
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
  } else {
    let index = 0;
    let diff = Number.POSITIVE_INFINITY;
    for (let i = 0; i < array.length; i++) {
      const currentDiff = Math.abs(array[i] - target);
      if (currentDiff < diff) {
        diff = currentDiff;
        index = i;
      }
    }
    return index;
  }
}
