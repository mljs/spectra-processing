import type { NumberArray } from 'cheminfo-types';

/**
 * XUniqueSorted.
 * @param array - array of numbers
 * @returns - sorted array
 */
export function xUniqueSorted(array: NumberArray): Float64Array<ArrayBuffer> {
  const unique = Float64Array.from(new Set(array));
  unique.sort();
  return unique;
}
