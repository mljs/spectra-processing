import type { NumberArray } from 'cheminfo-types';

export interface XFindClosestIndexOptions {
  /**
   * Is the array sorted ? This allows to make a dichotomic search that is much faster.
   * @default true
   */
  sorted?: boolean;
}

/**
 * Returns the closest index of a `target`
 * @param array - array of numbers.
 * @param target - target value.
 * @param options - options.
 * @returns closest index.
 */

export function xFindClosestIndex(
  array: NumberArray,
  target: number,
  options: XFindClosestIndexOptions = {},
): number {
  if (array.length === 0) {
    return -1;
  } else if (array.length === 1) {
    return 0;
  }

  const { sorted = true } = options;

  if (sorted) {
    //@ts-expect-error the length of the array was checked earlier.
    return array[0] < array.at(-1)
      ? findClosestIndexAscending(array, target)
      : findClosestIndexDescending(array, target);
  }

  // Linear scan for unsorted arrays
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

/**
 * Binary search for ascending-sorted arrays
 * @param array
 * @param target
 */
function findClosestIndexAscending(array: NumberArray, target: number): number {
  let low = 0;
  let high = array.length - 1;

  while (high - low > 1) {
    const middle = low + ((high - low) >> 1);
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
  }
  return low;
}

/**
 * Binary search for descending-sorted arrays
 * @param array
 * @param target
 */
function findClosestIndexDescending(
  array: NumberArray,
  target: number,
): number {
  let low = 0;
  let high = array.length - 1;

  while (high - low > 1) {
    const middle = low + ((high - low) >> 1);
    if (array[middle] > target) {
      // In descending order, larger values are on the left,
      // so target must be to the right of middle
      low = middle;
    } else if (array[middle] < target) {
      // Smaller values are on the right,
      // so target must be to the left of middle
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
  }
  return low;
}
