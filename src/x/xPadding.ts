import { DoubleArray } from 'cheminfo-types';

import { xCheck } from './xCheck';

/**
 * This function pads an array
 *s
 * @param array - the array that will be padded
 * @param options - options
 */
export function xPadding(
  array: DoubleArray,
  options: {
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
    /**
     * '', value, circular, duplicate
     * @default ''
     */
    algorithm?: string;
  } = {},
): Float64Array {
  const { size = 0, value = 0, algorithm = '' } = options;
  xCheck(array);

  if (!algorithm) {
    if (array instanceof Float64Array) {
      return array.slice();
    } else {
      return Float64Array.from(array);
    }
  }

  let result = new Float64Array(array.length + size * 2);

  for (let i = 0; i < array.length; i++) {
    result[i + size] = array[i];
  }

  let fromEnd = size + array.length;
  let toEnd = 2 * size + array.length;

  switch (algorithm.toLowerCase()) {
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
        result[i] = array[array.length - 1];
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
      throw Error('xPadding: unknown algorithm');
  }

  return result;
}
