import { DataXYZ } from '..';
import { xGetFromToIndex } from '../x/xGetFromToIndex';

import { xyCheck } from './xyCheck';
/**
 * Finds the max y value in a range and return a {x,y} point
 *
 * @param {DataXYZ} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
 * @param {object} [options={}] Options
 * @param {number} [options.from] - First value for xyIntegration in the X scale
 * @param {number} [options.fromIndex=0] - First point for xyIntegration
 * @param {number} [options.to] - Last value for xyIntegration in the X scale
 * @param {number} [options.toIndex=x.length-1] - Last point for xyIntegration
 * @returns {object} results
 */
export function xyMinYPoint(data: DataXYZ = {}, options = {}) {
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
