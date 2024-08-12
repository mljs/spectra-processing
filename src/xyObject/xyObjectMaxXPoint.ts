import { Point } from '../types';

import { xyObjectCheck } from './xyObjectCheck';

/**
 * Finds the max x value and return a {x,y,index} point
 * @param points - Object that contains property x (an ordered increasing array) and y (an array)
 */
export function xyObjectMaxXPoint(points: Point[] = []): Point {
  xyObjectCheck(points);

  if (points.length === 0) return { x: 0, y: 0 };

  let current = {
    x: points[0].x,
    y: points[0].y,
    index: 0,
  };

  for (let i = 1; i < points.length; i++) {
    if (points[i].x > current.x) {
      current = {
        x: points[i].x,
        y: points[i].y,
        index: i,
      };
    }
  }

  return current;
}
