import { DataXY } from 'cheminfo-types';

import { Point } from '..';

import { xyCheck } from './xyCheck';

/**
 * XyToXYObject.
 *
 * @param data - Array of points {x,y}.
 */
export function xyToXYObject(data: DataXY): Point[] {
  xyCheck(data);
  const { x, y } = data;
  let objectArray = [];
  for (let i = 0; i < x.length; i++) {
    objectArray.push({ x: x[i], y: y[i] });
  }
  return objectArray;
}
