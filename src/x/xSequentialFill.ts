import { NumberArray, DoubleArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';

/** Fill an array with sequential numbers
 *
 * @param input - optional destination array (if not provided a new array will be created)
 * @param options - options
 * @return array with sequential numbers
 */

export function xSequentialFill(
  input:
    | NumberArray
    | {
        /** first value in the array
         * @default 0
         */
        from?: number;
        /** last value in the array
         * @default 10
         */
        to?: number;
        /** size of the array (if not provided calculated from step)
         * @default input.length
         */
        size?: number;
        /** if not provided calculated from size */
        step?: number;
      } = [],
  options: { from?: number; to?: number; size?: number; step?: number } = {},
) {
  if (typeof input === 'object' && !isAnyArray(input)) {
    options = input as {
      from?: number;
      to?: number;
      size?: number;
      step?: number;
    };
    input = [] as DoubleArray;
  }

  if (!isAnyArray(input)) {
    throw new TypeError('input must be an array');
  }

  // maybe should not specify default step and size
  let {
    from = 0,
    to = 10,
    size = Array.isArray(input) ||
    input.constructor === Float64Array ||
    input.constructor === Uint16Array
      ? input.length
      : 0,
    step = null,
  } = options;

  if (!size) {
    if (step) {
      size = Math.floor((to - from) / step) + 1;
    } else {
      size = to - from + 1;
    }
  }
  if (!step && size) {
    step = (to - from) / (size - 1);
  }
  if (Array.isArray(input)) {
    // only works with normal array
    input.length = 0;
    for (let i = 0; i < size; i++) {
      input.push(from);
      if (step) from += step;
    }
  } else {
    if (
      Array.isArray(input) ||
      input.constructor === Float64Array ||
      (input.constructor === Uint16Array && input.length !== size)
    ) {
      throw new Error(
        'sequentialFill typed array must have the correct length',
      );
    }
    for (let i = 0; i < size; i++) {
      if (
        Array.isArray(input) ||
        input.constructor === Float64Array ||
        input.constructor === Uint16Array
      ) {
        input[i] = from;
      }
      if (step) {
        from += step;
      }
    }
  }

  return Array.isArray(input) ||
    input.constructor === Float64Array ||
    input.constructor === Uint16Array
    ? (Array.from(input) as DoubleArray)
    : [];
}
