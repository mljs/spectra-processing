import { DataXY } from 'cheminfo-types';

import { xyCheck } from './xyCheck';

/**
 * Filters x,y values to allow strictly growing values in x axis.
 *
 * @param data - Object that contains property x (an ordered increasing array) and y (an array).

 */
export function xyEnsureGrowingX(data: DataXY): DataXY {
  xyCheck(data);
  if (data.x === undefined || data.y === undefined) return data;
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
