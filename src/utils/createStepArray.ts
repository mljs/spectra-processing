export interface CreateStepArrayOptions {
  /**
   * start value of range
   * @default 0
   */
  from?: number;

  /**
   * step value between points
   * @default 1
   */
  step?: number;

  /**
   * number of points in range
   * @default 1000
   */
  length?: number;
}

/**
 * Create an array with numbers starting from "from" with step "step" of length "length".
 * @param options - options
 * @returns - array of distributed numbers with step "step" from "from"
 */
export function createStepArray(
  options: CreateStepArrayOptions = {},
): Float64Array {
  const { from = 0, step = 1, length = 1000 } = options;

  const array = new Float64Array(length);

  let index = 0;
  while (index < length) {
    array[index] = from + step * index;
    index++;
  }

  return array;
}
