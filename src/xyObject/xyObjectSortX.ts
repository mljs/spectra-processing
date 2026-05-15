import type { Point } from '../types/index.ts';

/**
 * Sorts an array of points in-place.
 * @param points - array of points {x,y}
 * @returns - sorted array of points {x,y}
 */
export function xyObjectSortX(points: Point[]): Point[] {
  points.sort((a, b) => a.x - b.x);
  return points;
}
