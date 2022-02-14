import { DoubleArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';

/**
 * This function xSubtract the first array by the second array or a constant value from each element of the first array
 *
 * @param array1 - the array that will be rotated
 * @param array2 - second array or number
 * @returns array after subtraction
 */
export function xSubtract(
  array1: DoubleArray,
  array2: DoubleArray | number,
): Float64Array {
  let isConstant = false;
  let constant = 0;
  if (isAnyArray(array2)) {
    if (array1.length !== (array2 as []).length) {
      throw new Error('xSubtract: size of array1 and array2 must be identical');
    }
  } else {
    isConstant = true;
    constant = Number(array2);
  }

  let array3 = new Float64Array(array1.length);
  if (isConstant) {
    for (let i = 0; i < array1.length; i++) {
      array3[i] = array1[i] - constant;
    }
  } else {
    for (let i = 0; i < array1.length; i++) {
      array3[i] = array1[i] - (array2 as [])[i];
    }
  }

  return array3;
}
