import type { NumberArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';

export interface XIsArrayOptions {
  /**
   * Minimum length.
   * Must be at least 1 because the first element is always checked.
   * @default 1
   */
  minLength?: number;
}

/**
 * Checks if the input is a non-empty array of numbers.
 * Only checks the first element.
 * @param input - array to check.
 * @param options - additional checks.
 * @returns Whether the value is a valid array of numbers.
 */
export function xIsArray(
  input: unknown,
  options: XIsArrayOptions = {},
): input is NumberArray {
  const { minLength = 1 } = options;
  return (
    isAnyArray(input) &&
    input.length > 0 &&
    typeof input[0] === 'number' &&
    input.length >= minLength
  );
}
