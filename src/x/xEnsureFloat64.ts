import { NumberArray } from 'cheminfo-types';

import { xCheck } from './xCheck';

/**
 * Returns a copy of the data as a Float64Array.
 * @param array - array of numbers
 */
export function xEnsureFloat64(array: NumberArray): Float64Array {
  xCheck(array);

  if (array instanceof Float64Array) {
    return array.slice(0);
  }

  return Float64Array.from(array);
}
