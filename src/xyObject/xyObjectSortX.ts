import type { Point } from '../types/index.ts';
import { xGetSortOrder } from '../x/index.ts';
import { RADIX_ORDER_MIN_LENGTH } from '../x/utils/radixSortOrder.ts';

/**
 * Sorts an array of points in-place.
 * @param points - array of points {x,y}.
 * @returns sorted array of points {x,y}.
 */
export function xyObjectSortX(points: Point[]): Point[] {
  const { length } = points;

  if (length < RADIX_ORDER_MIN_LENGTH) {
    points.sort((a, b) => a.x - b.x);
    return points;
  }

  const x = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    x[i] = points[i].x;
  }

  const order = xGetSortOrder(x);
  const sorted = new Array<Point>(length);
  for (let i = 0; i < length; i++) {
    sorted[i] = points[order[i]];
  }
  for (let i = 0; i < length; i++) {
    points[i] = sorted[i];
  }

  return points;
}
