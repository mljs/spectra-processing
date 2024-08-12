import { NumberArray } from 'cheminfo-types';

/**
 * Returns true if x is monotonic.
 * @param array - array of numbers.
 * @returns 1 if monotonic increasing, -1 if monotonic decreasing, 0 if not monotonic.
 */
export function xIsMonotonic(array: NumberArray): -1 | 0 | 1 {
  if (array.length <= 2) {
    return 1;
  }
  if (array[0] === array[1]) {
    // maybe a constant series
    for (let i = 1; i < array.length - 1; i++) {
      if (array[i] !== array[i + 1]) return 0;
    }
    return 1;
  }

  if (array[0] < (array.at(-1) as number)) {
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] >= array[i + 1]) return 0;
    }
    return 1;
  } else {
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] <= array[i + 1]) return 0;
    }
    return -1;
  }
}
