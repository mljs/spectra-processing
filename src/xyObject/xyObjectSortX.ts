import { Point } from '../types';

/**
 * Sorts an array of points in-place.
 * @param points - array of points {x,y}
 * @returns - sorted array of points {x,y}
 */
export function xyObjectSortX(points: Point[]): Point[] {
  return points.sort((a, b) => a.x - b.x);
}
