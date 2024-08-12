import { isAnyArray, AnyArray } from 'is-any-array';

/**
 * Verify that `data` is an object of x,y arrays.
 * Throws an error if it's not.
 * @param data
 * @param options
 * @param options.minLength
 */
export function xyCheck(
  data: unknown,
  options: {
    /** Minimum length. */
    minLength?: number;
  } = {},
): asserts data is { x: AnyArray; y: AnyArray } {
  const { minLength } = options;
  if (
    data === null ||
    typeof data !== 'object' ||
    // @ts-expect-error Typechecking
    !isAnyArray(data.x) ||
    // @ts-expect-error Typechecking
    !isAnyArray(data.y)
  ) {
    throw new Error('data must be an object of x and y arrays');
  }
  // @ts-expect-error Typechecking
  if ((data.x as number[]).length !== (data.y as number[]).length) {
    throw new Error('the x and y arrays must have the same length');
  }
  // @ts-expect-error Typechecking
  if (minLength && data.x.length < minLength) {
    throw new Error(`data.x must have a length of at least ${minLength}`);
  }
}
