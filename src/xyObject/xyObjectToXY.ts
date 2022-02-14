import { DataXY } from 'cheminfo-types';

import { Point } from '..';

/**
 * XyObjectToXY.
 *
 * @param points - Array of points {x,y}.
 */
export function xyObjectToXY(points: Point[]): DataXY {
  return {
    x: points.map((entry) => entry.x),
    y: points.map((entry) => entry.y),
  };
}
