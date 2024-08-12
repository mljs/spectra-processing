export interface CreateFromToArrayOptions {
  /**
   * start value of range
   * @default 0
   */
  from?: number;

  /**
   * end value of range
   * @default 1
   */
  to?: number;

  /**
   * number of points in range
   * @default 1000
   */
  length?: number;

  /**
   * include from
   * @default true
   */
  includeFrom?: boolean;

  /**
   * include to
   * @default true
   */
  includeTo?: boolean;

  /**
   * distribution used
   * @default uniform
   */
  distribution?: 'uniform' | 'log';
}

/**
 * Create an array with numbers between "from" and "to" of length "length"
 * @param options - options
 * @returns - array of distributed numbers between "from" and "to"
 */
export function createFromToArray(
  options: CreateFromToArrayOptions = {},
): Float64Array {
  const {
    from = 0,
    to = 1,
    length = 1000,
    includeFrom = true,
    includeTo = true,
    distribution = 'uniform',
  } = options;

  const array = new Float64Array(length);

  let div = length;
  if (includeFrom && includeTo) {
    div = length - 1;
  } else if ((!includeFrom && includeTo) || (includeFrom && !includeTo)) {
    div = length;
  } else if (!includeFrom && !includeTo) {
    div = length + 1;
  }

  const delta = (to - from) / div;
  if (distribution === 'uniform') {
    if (includeFrom) {
      let index = 0;
      while (index < length) {
        array[index] = from + delta * index;
        index++;
      }
    } else {
      let index = 0;
      while (index < length) {
        array[index] = from + delta * (index + 1);
        index++;
      }
    }
  } else if (distribution === 'log') {
    const base = (to / from) ** (1 / div);
    const firstExponent = Math.log(from) / Math.log(base);

    if (includeFrom) {
      let index = 0;
      while (index < length) {
        array[index] = base ** (firstExponent + index);
        index++;
      }
    } else {
      let index = 0;
      while (index < length) {
        array[index] = base ** (firstExponent + index + 1);
        index++;
      }
    }
  } else {
    throw new Error('distribution must be uniform or log');
  }

  return array;
}
