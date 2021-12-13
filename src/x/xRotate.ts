import { DoubleArray } from 'cheminfo-types';

/**
 * This function performs a circular shift to a new array
 * Positive values of shifts will shift to the right and negative values will do to the left
 *
 * @example xRotate([1,2,3,4],1) -> [4,1,2,3]
 * @example xRotate([1,2,3,4],-1) -> [2,3,4,1]
 * @param array - the array that will be rotated
 * @param shift number
 * @returns array of float
 */
export function xRotate(array: DoubleArray, shift: number): DoubleArray {
  shift = shift % array.length;
  if (shift < 0) shift += array.length;
  let result = new Float64Array(array.length);
  result.set(array.slice(array.length - shift));
  result.set(array.slice(0, array.length - shift), shift);
  return result;
}
