import { NumberArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';

import { getOutputArray } from './utils/getOutputArray';

/**
 * This function xMultiply the first array by the second array or a constant value to each element of the first array
 *
 * @param array1 - first array
 * @param array2 - second array
 * @param options - options
 */
export function xMultiply<T extends NumberArray = Float64Array>(
  array1: NumberArray,
  array2: NumberArray | number,
  options: {
    /** output into which the result should be placed if needed. In can be the same as array1 in order to have in-place modification */
    output?: T;
  } = {},
): T {
  let isConstant = false;
  let constant = 0;
  if (isAnyArray(array2)) {
    if (array1.length !== (array2 as []).length) {
      throw new Error('xMultiply: size of array1 and array2 must be identical');
    }
  } else {
    isConstant = true;
    constant = Number(array2);
  }

  let array3 = getOutputArray(options.output, array1.length);
  if (isConstant) {
    for (let i = 0; i < array1.length; i++) {
      array3[i] = array1[i] * constant;
    }
  } else {
    for (let i = 0; i < array1.length; i++) {
      array3[i] = array1[i] * (array2 as [])[i];
    }
  }

  return array3;
}
