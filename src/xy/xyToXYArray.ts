import { ArrayType, DataXY } from '..';

import { xyCheck } from './xyCheck';

/**
 * Convert a DataXY to an array of array containing x,y
 *
 * @param [data] array of points {x,y}
 * @returns result
 */
export function xyToXYArray(data: DataXY): ArrayType[] {
  xyCheck(data);
  const { x, y } = data;
  let objectArray = [];
  for (let i = 0; i < x.length; i++) {
    objectArray.push([x[i], y[i]]);
  }

  return objectArray;
}
