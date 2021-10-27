/**
 * @param {number[]} array array of number
 * @returns  {number[]} sorted array
 */
export function xUniqueSorted(
  array: number[] | Float64Array,
): number[] | Float64Array {
  return Float64Array.from(new Set(array)).sort();
}
