import { Data, DataXYZ } from '..';

import { xyCheck } from './xyCheck';

/**
 * Filters x,y values to allow strictly growing values in x axis.
 *
 * @param {Data} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
 * @returns {Data} result
 */
export function xyEnsureGrowingX(data: DataXYZ = {}): Data {
  xyCheck(data);
  if (data.x === undefined || data.y === undefined) return data as Data;
  const x = Array.from(data.x);
  const y = Array.from(data.y);
  let prevX = -Infinity;
  let ansX = [];
  let ansY = [];

  for (let index = 0; index < x.length; index++) {
    if (prevX < x[index]) {
      ansX.push(x[index]);
      ansY.push(y[index]);
      prevX = x[index];
    }
  }
  return { x: ansX, y: ansY };
}