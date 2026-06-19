import type { DataXY } from 'cheminfo-types';

import type { Point } from '../types/index.ts';

/**
 * Converts an array of {x,y} point objects to a DataXY object.
 * @param points - array of {x,y} point objects.
 */
export function xyObjectToXY(points: Point[]): DataXY<number[]> {
  return {
    x: points.map((entry) => entry.x),
    y: points.map((entry) => entry.y),
  };
}
