import { NumberArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';

/**
 * Checks if input is of type array
 *
 * @param input - input
 */
export function xCheck(
  input?: NumberArray,
  options: {
    /** minimum length */
    minLength?: number;
  } = {},
) {
  const { minLength } = options;
  if (!isAnyArray(input)) {
    throw new TypeError('input must be an array');
  }
  if ((input as NumberArray).length === 0) {
    throw new TypeError('input must not be empty');
  }
  //@ts-expect-error we already checked that input is an array
  if (minLength && input.length < minLength) {
    throw new Error(`input must have a length of at least ${minLength}`);
  }
}
