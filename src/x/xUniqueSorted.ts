import { ArrayType } from '..';

/**
 * XUniqueSorted.
 *
 * @param array - Array of number.
 * @returns Sorted array.
 */
export function xUniqueSorted(array: ArrayType): ArrayType {
  return Float64Array.from(new Set(array)).sort();
}
