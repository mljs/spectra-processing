import { Point, DataXY } from '..';

/**
 *
 * XyObjectToXY.
 *
 * @param [points] - Array of points {x,y}.
 * @returns DataXY.
 */
export function xyObjectToXY(points: Point[]): DataXY {
  return {
    x: points.map((entry) => entry.x),
    y: points.map((entry) => entry.y),
  };
}
