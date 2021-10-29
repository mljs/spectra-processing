import { ArrayType, Data } from '..';

import { xyCheck } from './xyCheck';

/**
 * Convert a DataXY to an array of array containing x,y
 *
 * @param {Data} [data] array of points {x,y}
 * @returns {Array<Array<number,number>>} result
 */
export function xyToXYArray(data: Data): ArrayType[] {
  xyCheck(data);
  const { x, y } = data;
  let objectArray = [];
  for (let i = 0; i < x.length; i++) {
    objectArray.push([x[i], y[i]]);
  }

  return objectArray;
}
