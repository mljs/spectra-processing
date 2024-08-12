import { NumberArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';

/**
 * Calculate an array of the same size that is the cumulative values
 * @param array - initial array
 */
export function xCumulative(array: NumberArray): Float64Array {
  if (!isAnyArray(array)) {
    throw new TypeError('input must be an array');
  }

  const newArray = new Float64Array(array.length);
  if (array.length === 0) return newArray;

  newArray[0] = array[0];
  for (let i = 1; i < array.length; i++) {
    newArray[i] = newArray[i - 1] + array[i];
  }
  return newArray;
}
