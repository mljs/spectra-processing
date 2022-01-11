import { DoubleArray } from 'cheminfo-types';

/**
 * Returns true if x is monotone
 *
 * @param array - array of numbers
 */
export function xIsMonotone(array: DoubleArray): boolean {
  if (array.length <= 2) {
    return true;
  }
  if (array[0] === array[1]) {
    // maybe a constant series
    for (let i = 1; i < array.length - 1; i++) {
      if (array[i] !== array[i + 1]) return false;
    }
    return true;
  }

  if (array[0] < array[array.length - 1]) {
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] >= array[i + 1]) return false;
    }
  } else {
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] <= array[i + 1]) return false;
    }
  }
  return true;
}
