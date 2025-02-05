import type { DataXY } from 'cheminfo-types';

import type { Point } from '../types';

/**
 * Convert an array of points {x,y} to an object with x and y attributes.
 * @param points - Array of points {x,y}.
 * @returns - Object x and y attributes.
 */
export function xyObjectToXY(points: Point[]): DataXY<number[]> {
  return {
    x: points.map((entry) => entry.x),
    y: points.map((entry) => entry.y),
  };
}
