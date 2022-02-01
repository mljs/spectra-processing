import { DoubleArray } from 'cheminfo-types';

/**
 * Create an array with numbers between "from" and "to" of length "length"
 *
 * @param options - options
 * @return - array of floats
 */
export function createXArray(
  options: {
    /**
     * start value of range
     * @default 0 */
    from?: number;
    /**
     * end value of range
     * @default 1 */
    to?: number;
    /**
     * number of points in range
     * @default 1000 */
    length?: number;
    /**
     * include from
     * @default true */
    includeFrom?: boolean;
    /**
     * include to
     * @default true */
    includeTo?: boolean;
    /**
     * distribution used
     * @default uniform */
    distribution?: string;
    /**
     * base of log distribution if log used
     * @default 10 */
    base?: number;
  } = {},
): DoubleArray {
  const {
    from = 0,
    to = 1,
    length = 1000,
    includeFrom = true,
    includeTo = true,
    distribution = 'uniform',
    base = 10,
  } = options;

  const array = new Float64Array(length);

  let div = length;
  if (includeFrom === true && includeTo === true) {
    div = length - 1;
  } else if (
    (includeFrom === false && includeTo === true) ||
    (includeFrom === true && includeTo === false)
  ) {
    div = length;
  } else if (includeFrom === false && includeTo === false) {
    div = length + 1;
  }

  let delta = (to - from) / div;
  if (distribution === 'uniform') {
    if (includeFrom === true) {
      for (let i = 0, j = 0; i <= to && j < length; i = i + delta, j++) {
        array[j] = from + i;
      }
    } else {
      for (let i = 0, j = 0; i <= to && j < length; i = i + delta, j++) {
        array[j] = from + delta + i;
      }
    }
  } else if (distribution === 'log') {
    if (includeFrom === true) {
      for (let i = 0, j = 0; i <= to && j < length; i = i + delta, j++) {
        array[j] = base ** (from + i);
      }
    } else {
      for (let i = 0, j = 0; i <= to && j < length; i = i + delta, j++) {
        array[j] = base ** (from + delta + i);
      }
    }
  } else {
    throw new Error(
      'Please choose for the distribution either uniform or log. By default the distribution chosen is uniform.',
    );
  }

  return array;
}
