import { isAnyArray } from 'is-any-array';
<<<<<<< HEAD:src/x/xCumulative.ts
import { ArrayType } from '..';
=======
>>>>>>> master:src/x/xCumulative.js

/**
 * Calculate a new array of the same size that is the cumulative values
 *
 * @param {number[]} array array
 * @returns {Array<number>} result
 */
<<<<<<< HEAD:src/x/xCumulative.ts
export function xCumulative(array: ArrayType): ArrayType {
=======
export function xCumulative(array) {
>>>>>>> master:src/x/xCumulative.js
  if (!isAnyArray(array)) {
    throw new TypeError('input must be an array');
  }

  let newArray = new Float64Array(array.length);
  if (array.length < 1) return newArray;

  newArray[0] = array[0];
  for (let i = 1; i < array.length; i++) {
    newArray[i] = newArray[i - 1] + array[i];
  }
  return newArray;
}
