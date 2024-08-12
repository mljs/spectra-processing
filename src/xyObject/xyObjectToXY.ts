import { DataXY } from 'cheminfo-types';

import { Point } from '../types';

/**
 * xyObjectToXY.
 * @param points - Array of points {x,y}.
 */
export function xyObjectToXY(points: Point[]): DataXY<number[]> {
  return {
    x: points.map((entry) => entry.x),
    y: points.map((entry) => entry.y),
  };
}
