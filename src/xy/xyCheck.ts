import { isAnyArray } from 'is-any-array';

/**
 * Throw an error in no an object of x,y arrays
 *
 * @param data - array of points {x,y,z}
 */
export function xyCheck(
  data: any,
  options: {
    /** minimum length */
    minLength?: number;
  } = {},
) {
  const { minLength } = options;
  if (typeof data !== 'object' || !isAnyArray(data.x) || !isAnyArray(data.y)) {
    throw new Error('Data must be an object of x and y arrays');
  }
  if ((data.x as number[]).length !== (data.y as number[]).length) {
    throw new Error('The x and y arrays must have the same length');
  }
  if (minLength) {
    if (data.x.length < minLength) {
      throw new Error(`data.x must have a length of at least ${minLength}`);
    }
  }
}
