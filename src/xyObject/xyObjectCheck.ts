import type { Point } from '../types';

export interface XYObjectCheckOptions {
  /**
   * Minimum length
   * @default 0
   */
  minLength?: number;
}

/**
 * Throws an error if it's not an array of x,y objects.
 * Only checks the first element.
 * @param points - List of points.
 * @param options - Additional checks.
 */
export function xyObjectCheck(
  points?: Point[],
  options: XYObjectCheckOptions = {},
): asserts points is Point[] {
  const { minLength = 0 } = options;
  if (!Array.isArray(points)) {
    throw new Error('points must be an array of {x,y} objects');
  }
  if (
    points.length > 0 &&
    (typeof points[0].x !== 'number' || typeof points[0].y !== 'number')
  ) {
    throw new Error('points must be an array of {x,y} objects');
  }
  if (minLength && points.length < minLength) {
    throw new Error(`points must have a length of at least ${minLength}`);
  }
}
