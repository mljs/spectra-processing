import { NumberArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';

/**
 * Checks if input is of type array
 *
 * @param input - input
 */
export function xCheck(input?: NumberArray) {
  if (!isAnyArray(input)) {
    throw new TypeError('input must be an array');
  }

  if ((input as NumberArray).length === 0) {
    throw new TypeError('input must not be empty');
  }
}
