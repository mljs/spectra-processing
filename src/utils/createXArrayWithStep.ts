/**
 * Create an array with numbers starting from "from" with step "step" of length "length"
 *
 * @param options - options
 * @return - array of distributed numbers with step "step" from "from"
 */
export function createXArrayWithStep(
  options: {
    /**
     * start value of range
     * @default 0 */
    from?: number;
    /**
     * step value between points
     * @default 1
     */
    step?: number;
    /**
     * number of points in range
     * @default 1000 */
    length?: number;
    /**
     * distribution used
     * @default uniform */
    distribution?: string;
  } = {},
): Float64Array {
  let { from = 0, step = 1, length = 1000, distribution = 'uniform' } = options;

  let to = from + step * length;

  const array = new Float64Array(length);
  let delta = (to - from) / length;

  if (distribution === 'uniform') {
    let index = 0;
    while (index < length) {
      array[index] = from + delta * index;
      index++;
    }
  } else if (distribution === 'log') {
    let base = (to / from) ** (1 / length);
    let firstExponent = Math.log(from) / Math.log(base);
    let index = 0;
    while (index < length) {
      array[index] = base ** (firstExponent + index);
      index++;
    }
  } else {
    throw new Error(
      'Please choose for the distribution either uniform or log. By default the distribution chosen is uniform.',
    );
  }

  return array;
}
