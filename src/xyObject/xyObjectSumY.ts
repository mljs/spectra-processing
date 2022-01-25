import { Point } from '..';

import { xyObjectCheck } from './xyObjectCheck';

/**
 * Calculate the sum of Y values
 *
 * @param points - Object that contains property x and y (an array)
 */
export function xyObjectSumY(points: Point[] = []): number {
  xyObjectCheck(points);

  let sum = 0;
  for (let point of points) {
    sum += point.y;
  }

  return sum;
}
