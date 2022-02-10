import { NumberArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';
import quickSelectMedian from 'median-quickselect';

/**
 * Calculates the median of an array
 *
 * @param input - Array containing values
 * @returns - median
 */

export function xMedian(input: NumberArray) {
  if (!isAnyArray(input)) {
    throw new TypeError('input must be an array');
  }

  if (input.length === 0) {
    throw new TypeError('input must not be empty');
  }
  return quickSelectMedian(input.slice());
}
