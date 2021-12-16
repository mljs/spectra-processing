import { DoubleArray, DataXY } from 'cheminfo-types';

import { xyCheck } from './xyCheck';
/**
 * Filter out all the points for which x <= 0. Useful to display log scale data
 *
 * @param data - data
 * @returns - An object with the filtered data
 */
export function xyFilterXPositive(data: DataXY): DataXY {
  xyCheck(data);
  const { x, y } = data;
  const newX: DoubleArray = [];
  const newY: DoubleArray = [];
  if (x === undefined || y === undefined) return { x: newX, y: newY };
  for (let i = 0; i < x.length; i++) {
    if (x[i] > 0) {
      newX.push(x[i]);
      newY.push(y[i]);
    }
  }

  return { x: newX, y: newY };
}
