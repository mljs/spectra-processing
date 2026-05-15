import type { NumberArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';

export interface XCheckOptions {
  /**
   * Minimum length
   * @default 1
   */
  minLength?: number;
}

/**
 * Checks if the input is a non-empty array of numbers.
 * Only checks the first element.
 * @param input - Array to check.
 * @param options - Additional checks.
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
