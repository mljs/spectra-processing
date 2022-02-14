import { DoubleArray } from 'cheminfo-types';

/**
 * XUniqueSorted.
 *
 * @param array - array of numbers
 * @returns - sorted array
 */
export function xUniqueSorted(array: DoubleArray): Float64Array {
  return Float64Array.from(new Set(array)).sort();
}
