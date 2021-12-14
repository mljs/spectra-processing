import { Point } from '..';

import { xyObjectCheck } from './xyObjectCheck';

/**
 * Finds the min y value and return a {x,y,index} point
 *
 * @param points - Object that contains property x (an ordered increasing array) and y (an array)
 */
export function xyObjectMinYPoint(points: Point[] = []): Point {
  xyObjectCheck(points);

  if (points.length < 1) return { x: 0, y: 0 };

  let current: Point = {
    x: points[0].x,
    y: points[0].y,
    index: 0,
  };

  for (let i = 1; i < points.length; i++) {
    if (points[i].y < current.y) {
      current = {
        x: points[i].x,
        y: points[i].y,
        index: i,
      };
    }
  }

  return current;
}
