import { NumberArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';

export interface XCheckOptions {
  /** minimum length */
  minLength?: number;
}

/**
 * Checks if input is of type array.
 * @param input - input
 * @param options
 */
export function xCheck(
  input?: NumberArray,
  options: XCheckOptions = {},
): asserts input is NumberArray {
  const { minLength } = options;
  if (!isAnyArray(input)) {
    throw new TypeError('input must be an array');
  }
  if (input.length === 0) {
    throw new TypeError('input must not be empty');
  }
  if (typeof input[0] !== 'number') {
    throw new TypeError('input must contain numbers');
  }
  if (minLength && input.length < minLength) {
    throw new Error(`input must have a length of at least ${minLength}`);
  }
}
