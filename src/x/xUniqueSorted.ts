import { ArrayType } from '..';

/**
 * @param {ArrayType} array array of number
 * @returns  {ArrayType} sorted array
 */
export function xUniqueSorted(array: ArrayType): ArrayType {
  return Float64Array.from(new Set(array)).sort();
}
