import { DoubleArray, DataXY } from 'cheminfo-types';

import { xyCheck } from './xyCheck';

/**
 * Convert a DataXY to an array of array containing x,y
 *
 * @param data - array of points {x,y}
 */
export function xyToXYArray(data: DataXY): DoubleArray[] {
  xyCheck(data);
  const { x, y } = data;
  let objectArray = [];
  for (let i = 0; i < x.length; i++) {
    objectArray.push([x[i], y[i]]);
  }

  return objectArray;
}
