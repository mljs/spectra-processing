import { NumberArray } from 'cheminfo-types';

/**
 * Returns true if x is monotone
 *
 * @param array - array of numbers
 */
export function xIsMonotoneIncreasing(array: NumberArray): boolean {
  if (array.length < 2) {
    return true;
  }
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] >= array[i + 1]) return false;
  }
  return true;
}
