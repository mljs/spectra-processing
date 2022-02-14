import { Point } from '..';

/**
 * xyObjectJoinX.
 *
 * @param points - Array of growing points {x,y}.
 * @param options - Options.
 */
export function xyObjectJoinX(
  points: Point[],
  options: {
    /**
     * Limit to join the data.
     * @default Number.EPSILON
     * */
    xError?: number;
  } = {},
): Point[] {
  const { xError = Number.EPSILON } = options;

  // when we join we will use the center of mass
  let result: Point[] = [];
  let current: Point = {
    x: Number.MIN_SAFE_INTEGER,
    y: 0,
  };
  for (let point of points) {
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
