import { Point, XYPoints } from '..';

/**
 *
 * @param {Point[]} [points] array of points {x,y}
 * @returns {XYPoints} {x:array of numbers , y:array of numbers}
 */
export function xyObjectToXY(points: Point[]): XYPoints {
  return {
    x: points.map((entry) => entry.x),
    y: points.map((entry) => entry.y),
  };
}
