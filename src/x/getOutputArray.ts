import { NumberArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';

export function getOutputArray<T extends NumberArray = Float64Array>(
  output: T,
  length: number,
): T;

export function getOutputArray(output: undefined, length: number): Float64Array;

export function getOutputArray<T extends NumberArray = Float64Array>(
  output: T | undefined,
  length: number,
): T;

/**
 * This function
 * @param output - undefined or a new array
 * @param length - length of the output array
 * @returns
 */
export function getOutputArray(
  output: NumberArray | undefined,
  length: number,
): NumberArray {
  if (output !== undefined) {
    if (!isAnyArray(output)) {
      throw new TypeError('output option must be an array if specified');
    }
    if (output.length !== length) {
      throw new TypeError('the output array does not have the correct length');
    }
    return output;
  } else {
    return new Float64Array(length);
  }
}
