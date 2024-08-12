import { DataXY } from 'cheminfo-types';

import { Point } from '../types';

import { xyCheck } from './xyCheck';

/**
 * xyToXYObject.
 * @param data - Array of points {x,y}.
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
