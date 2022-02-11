import { DoubleArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';
import quickSelectMedian from 'median-quickselect';

/**
 * Calculates the median of an array
 *
 * @param input - Array containing values
 * @returns - median
 */

export function xMedian(input: DoubleArray | Uint16Array) {
  if (!isAnyArray(input)) {
    throw new TypeError('input must be an array');
  }

  if (input.length === 0) {
    throw new TypeError('input must not be empty');
  }

  // we need to slice because the order of elements is changed in the quickselect
  // https://github.com/mad-gooze/median-quickselect
  return quickSelectMedian(input.slice());
}
