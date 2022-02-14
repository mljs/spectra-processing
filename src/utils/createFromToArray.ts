/**
 * Create an array with numbers between "from" and "to" of length "length"
 *
 * @param options - options
 * @return - array of distributed numbers between "from" and "to"
 */
export function createFromToArray(
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
  } = {},
): Float64Array {
  let {
    from = 0,
    to = 1,
    length = 1000,
    includeFrom = true,
    includeTo = true,
    distribution = 'uniform',
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
    let base = (to / from) ** (1 / div);
    let firstExponent = Math.log(from) / Math.log(base);

    if (includeFrom === true) {
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
    throw new Error(
      'Please choose for the distribution either uniform or log. By default the distribution chosen is uniform.',
    );
  }

  return array;
}
