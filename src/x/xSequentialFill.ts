/* eslint-disable max-lines-per-function */

import { NumberArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';

export interface XSequentialFillOptions {
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
}

export function xSequentialFill(
  input: NumberArray | undefined,
  options?: XSequentialFillOptions,
): NumberArray;
export function xSequentialFill(options?: XSequentialFillOptions): number[];
/**
 * Fill an array with sequential numbers
 *
 * @param input - optional destination array (if not provided a new array will be created)
 * @param options - options
 * @return array with sequential numbers
 */
export function xSequentialFill(
  input: NumberArray | XSequentialFillOptions = [],
  options: XSequentialFillOptions = {},
): NumberArray {
  if (typeof input === 'object' && !isAnyArray(input)) {
    options = input;
    input = [];
  }

  if (!isAnyArray(input)) {
    throw new TypeError('input must be an array');
  }

  // maybe should not specify default step and size
  const { to = 10 } = options;
  let {
    from = 0,
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
    ? Array.from(input)
    : [];
}
