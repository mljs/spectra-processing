import { Point } from '../types';

export interface XYObjectJoinXOptions {
  /**
   * Limit to join the data.
   * @default Number.EPSILON
   */
  xError?: number;
}

/**
 * xyObjectJoinX.
 * @param points - Array of growing points {x,y}.
 * @param options - Options.
 */
export function xyObjectJoinX(
  points: Point[],
  options: XYObjectJoinXOptions = {},
): Point[] {
  const { xError = Number.EPSILON } = options;

  // when we join we will use the center of mass
  const result: Point[] = [];
  let current: Point = {
    x: Number.MIN_SAFE_INTEGER,
    y: 0,
  };
  for (const point of points) {
    if (point.x - current.x <= xError) {
      // weighted sum
      if (current.y !== 0 || point.y !== 0) {
        current.x =
          (point.y / (current.y + point.y)) * (point.x - current.x) + current.x;
        current.y += point.y;
      }
    } else {
      current = {
        x: point.x,
        y: point.y,
      };
      result.push(current);
    }
  }
  return result;
}
