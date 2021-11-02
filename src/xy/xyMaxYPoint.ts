import { DataXYZ } from '..';
import { xGetFromToIndex } from '../x/xGetFromToIndex';

import { xyCheck } from './xyCheck';
/**.
 * Finds the max y value in a range and return a {x,y} point
 *
 * @param [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
 * @param data.x x
 * @param data.y y
 * @param data.z z
 * @param [options={}] Options
 * @param [options.from] - First value for xyIntegration in the X scale
 * @param [options.fromIndex=0] - First point for xyIntegration
 * @param [options.to] - Last value for xyIntegration in the X scale
 * @param [options.toIndex=x.length-1] - Last point for xyIntegration
 * @returns result
 */
export function xyMaxYPoint(
  data: DataXYZ = {},
  options: {
    from?: number;
    fromIndex?: number;
    toIndex?: number;
    to?: number;
  } = {},
): { x: number; y: number; index: number } {
  xyCheck(data);
  const { x, y } = data;
  if (x === undefined || y === undefined || x.length < 2) {
    return { x: 0, y: 0, index: 0 };
  }

  const { fromIndex, toIndex } = xGetFromToIndex(x, options);

  let current = { x: x[fromIndex], y: y[fromIndex], index: fromIndex };
  for (let i = fromIndex; i <= toIndex; i++) {
    if (y[i] > current.y) current = { x: x[i], y: y[i], index: i };
  }

  return current;
}
