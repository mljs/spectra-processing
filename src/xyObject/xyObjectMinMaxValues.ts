import type { Point } from '../types';

import { xyObjectCheck } from './xyObjectCheck';

/**
 * Returns all min and max values of an array of points.
 * @param points - Array of points {x,y}.
 * @returns - Object with the 4 extrema.
 */
export function xyObjectMinMaxValues(points: Point[]): {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
} {
  xyObjectCheck(points, { minLength: 1 });

  let minX = points[0].x;
  let maxX = minX;
  let minY = points[0].y;
  let maxY = minY;

  for (const point of points) {
    if (point.x < minX) minX = point.x;
    if (point.x > maxX) maxX = point.x;
    if (point.y < minY) minY = point.y;
    if (point.y > maxY) maxY = point.y;
  }

  return { minX, maxX, minY, maxY };
}
