import { DataXY } from 'cheminfo-types';

import { xGetFromToIndex } from '../x/xGetFromToIndex';

import { xyCheck } from './xyCheck';

/**
 * Finds the min y value in a range and return a {x,y} point
 *
 * @param data - Object that contains property x (an ordered increasing array) and y (an array)
 * @param options - Options
 */
export function xyMinYPoint(
  data: DataXY,
  options: {
    /**
     * First value for xyMinYPoint in the X scale
     */
    from?: number;
    /**
     * First point for xyMinYPoint
     * @default 0
     * */
    fromIndex?: number;
    /**
     *  Last point for xyMinYPoint
     * @default x.length-1
     * */
    toIndex?: number;
    /**
     * Last value for xyMinYPoint in the X scale
     */
    to?: number;
  } = {},
) {
  xyCheck(data, { minLength: 1 });
  const { x, y } = data;
  if (x.length === 1) return { x: x[0], y: y[0], index: 0 };

  const { fromIndex, toIndex } = xGetFromToIndex(x, options);

  let current = { x: x[fromIndex], y: y[fromIndex], index: fromIndex };
  for (let i = fromIndex; i <= toIndex; i++) {
    if (y[i] < current.y) current = { x: x[i], y: y[i], index: i };
  }

  return current;
}
