import { DoubleArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';

/**
 * This function xAdd the first array by the second array or a constant value to each element of the first array
 *
 * @param array1 - the first array
 * @param array2 - the second array or number
 */
export function xAdd(
  array1: DoubleArray,
  array2: DoubleArray | number,
): Float64Array {
  let isConstant = false;
  let constant = 0;
  if (isAnyArray(array2)) {
    if (array1.length !== (array2 as number[]).length) {
      throw new Error('xAdd: size of array1 and array2 must be identical');
    }
  } else {
    isConstant = true;
    constant = array2 as number;
  }

  let array3 = new Float64Array(array1.length);
  if (isConstant) {
    for (let i = 0; i < array1.length; i++) {
      array3[i] = array1[i] + constant;
    }
  } else {
    for (let i = 0; i < array1.length; i++) {
      array3[i] = array1[i] + (array2 as number[])[i];
    }
  }

  return array3;
}
