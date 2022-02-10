import { DoubleArray } from 'cheminfo-types';

/**
 * XUniqueSorted.
 *
 * @param array - Array of number.
 * @returns - Sorted array.
 */
export function xUniqueSorted(array: DoubleArray): Float64Array {
  return Float64Array.from(new Set(array)).sort();
}
