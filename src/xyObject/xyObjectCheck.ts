import { Point } from '../types';

/**
 * Throws an error in not an array of x,y objects.
 * @param points - List of points.
 */
export function xyObjectCheck(points?: Point[]): asserts points is Point[] {
  if (!Array.isArray(points)) {
    throw new Error('points must be an array of {x,y} objects');
  }
  if (
    points.length > 0 &&
    (typeof points[0].x !== 'number' || typeof points[0].y !== 'number')
  ) {
    throw new Error('points must be an array of {x,y} objects');
  }
}
