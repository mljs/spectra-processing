import { isAnyArray } from 'is-any-array';
/**
 * This function xMultiply the first array by the second array or a constant value to each element of the first array
 *
 * @param {number[]} array1 - the array that will be rotated
 * @param {number[]} array2 --second array
 * @returns {Float64Array} array of result
 */
export function xMultiply(
  array1: number[] | Float64Array,
  array2: number[] | Float64Array | number | Float32Array,
): number[] | Float64Array {
  let isConstant = false;
  let constant = 0;
  if (isAnyArray(array2)) {
    if (array1.length !== (array2 as number[]).length) {
      throw new Error('xMultiply: size of array1 and array2 must be identical');
    }
  } else {
    isConstant = true;
    constant = Number(array2);
  }

  let array3 = new Float64Array(array1.length);
  if (isConstant) {
    for (let i = 0; i < array1.length; i++) {
      array3[i] = array1[i] * constant;
    }
  } else {
    for (let i = 0; i < array1.length; i++) {
      array3[i] = array1[i] * (array2 as number[])[i];
    }
  }

  return array3;
}
