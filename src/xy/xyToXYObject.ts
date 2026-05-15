import type { DataXY } from 'cheminfo-types';

import type { Point } from '../types/index.ts';

import { xyCheck } from './xyCheck.ts';

/**
 * Converts a DataXY object to an array of {x,y} point objects.
 * @param data - array of points {x,y}.
 */
export function xyToXYObject(data: DataXY): Point[] {
  xyCheck(data);
  const { x, y } = data;
  const objectArray: Point[] = [];
  for (let i = 0; i < x.length; i++) {
    objectArray.push({ x: x[i], y: y[i] });
  }
  return objectArray;
}
