import type { Point } from '../types/index.ts';
import { xGetSortOrder } from '../x/index.ts';
import { RADIX_ORDER_MIN_LENGTH } from '../x/utils/radixSortOrder.ts';

/**
 * Returns a copy of an array of points sorted by x, leaving the input unchanged.
 * The sort is stable. NaN values are not supported.
 * @param points - array of points {x,y}.
 * @returns a new array of the points, ascending by x.
 */
export function xyObjectToSorted<T extends Point>(points: readonly T[]): T[] {
  const { length } = points;

  if (length < RADIX_ORDER_MIN_LENGTH) {
    return points.toSorted((a, b) => a.x - b.x);
  }

  const x = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    x[i] = points[i].x;
  }

  const order = xGetSortOrder(x);
  const sorted = new Array<T>(length);
  for (let i = 0; i < length; i++) {
    sorted[i] = points[order[i]];
  }

  return sorted;
}
