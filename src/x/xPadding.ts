import { NumberArray } from 'cheminfo-types';

import { xCheck } from './xCheck';
import { xEnsureFloat64 } from './xEnsureFloat64';

export interface XPaddingOptions {
  /**
   * padding size before first element and after last element
   * @default 0
   */
  size?: number;

  /**
   * value to use for padding (if algorithm='value')
   * @default 0
   */
  value?: number;
  algorithm?: 'value' | 'duplicate' | 'circular';
}

/**
 * This function pads an array
 *s
 * @param array - the array that will be padded
 * @param options - options
 */
export function xPadding(
  array: NumberArray,
  options: XPaddingOptions = {},
): Float64Array {
  const { size = 0, value = 0, algorithm } = options;
  xCheck(array);
  if (!algorithm) {
    return xEnsureFloat64(array);
  }

  const result = new Float64Array(array.length + size * 2);

  for (let i = 0; i < array.length; i++) {
    result[i + size] = array[i];
  }

  const fromEnd = size + array.length;
  const toEnd = 2 * size + array.length;

  switch (algorithm) {
    case 'value':
      for (let i = 0; i < size; i++) {
        result[i] = value;
      }
      for (let i = fromEnd; i < toEnd; i++) {
        result[i] = value;
      }
      break;
    case 'duplicate':
      for (let i = 0; i < size; i++) {
        result[i] = array[0];
      }
      for (let i = fromEnd; i < toEnd; i++) {
        result[i] = array.at(-1) as number;
      }
      break;
    case 'circular':
      for (let i = 0; i < size; i++) {
        result[i] =
          array[(array.length - (size % array.length) + i) % array.length];
      }
      for (let i = 0; i < size; i++) {
        result[i + fromEnd] = array[i % array.length];
      }
      break;
    default:
      throw new Error(`unknown algorithm ${String(algorithm)}`);
  }

  return result;
}
