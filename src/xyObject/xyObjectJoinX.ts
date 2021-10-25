import { Point } from '..';

/**
 *
 * @param {Array<Point>} [points] array of growing points {x,y}
 * @param {OptionsType} [options={}]
 * @param {number} [xError=Number.EPSILON] limit to join the data
 */
interface OptionsType {
  xError?: number;
}
/**
 * @param {Array<Point>} points list of points
 * @param {OptionsType} options {xError?: number;}
 * @returns {Array<Point>} points list of points
 */
export function xyObjectJoinX(
  points: Point[],
  options: OptionsType = {},
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
