import { Point, DataXY } from '..';

/**
 *
 * @param {Point[]} [points] array of points {x,y}
 * @returns {DataXY} {x:array of numbers , y:array of numbers}
 */
export function xyObjectToXY(points: Point[]): DataXY {
  return {
    x: points.map((entry) => entry.x),
    y: points.map((entry) => entry.y),
  };
}
