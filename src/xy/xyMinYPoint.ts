import { DataXY } from 'cheminfo-types';

import { xGetFromToIndex } from '../x/xGetFromToIndex';

import { xyCheck } from './xyCheck';
/**
 * Finds the max y value in a range and return a {x,y} point
 *
 * @param data - Object that contains property x (an ordered increasing array) and y (an array)
 * @param options - Options
 */
export function xyMinYPoint(data: DataXY, options = {}) {
  xyCheck(data);
  const { x, y } = data;
  if (x === undefined || y === undefined || x.length < 2) return 0;

  const { fromIndex, toIndex } = xGetFromToIndex(x, options);

  let current = { x: x[fromIndex], y: y[fromIndex], index: fromIndex };
  for (let i = fromIndex; i <= toIndex; i++) {
    if (y[i] < current.y) current = { x: x[i], y: y[i], index: i };
  }

  return current;
}
