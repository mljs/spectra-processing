import { DataXY } from 'cheminfo-types';

import { xIsMonotonic } from '../x';

import { xyCheck } from './xyCheck';

/**
 * Filters x,y values to allow strictly growing values in x-axis.
 * @param data - Object that contains property x (an ordered increasing array) and y (an array).
 */
export function xyEnsureGrowingX(data: DataXY): DataXY {
  xyCheck(data);
  if (xIsMonotonic(data.x) === 1) return data;
  const x = Array.from(data.x);
  const y = Array.from(data.y);
  let prevX = Number.NEGATIVE_INFINITY;

  let currentIndex = 0;

  for (let index = 0; index < x.length; index++) {
    if (prevX < x[index]) {
      if (currentIndex < index) {
        x[currentIndex] = x[index];
        y[currentIndex] = y[index];
      }
      currentIndex++;
      prevX = x[index];
    }
  }
  x.length = currentIndex;
  y.length = currentIndex;
  return { x, y };
}
