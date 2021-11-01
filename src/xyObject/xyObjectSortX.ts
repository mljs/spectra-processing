import { Point } from '..';
/**
 * Sorts an array of points
 *
 * @param {Point[]} [points] array of points {x,y}
 * @returns {Point[]} sorted array of points {x,y}
 */
export function xyObjectSortX(points: Point[]): Point[] {
  return points.sort((a, b) => a.x - b.x);
}
