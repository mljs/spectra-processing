import { DataXYZ } from '..';
import { xGetFromToIndex } from '../x/xGetFromToIndex';

import { xyCheck } from './xyCheck';
/**
 * Finds the max value in a zone
 *
 * @param [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
 * @param [options={}] Options
 * @param [options.from] - First value for xyIntegration in the X scale
 * @param [options.fromIndex=0] - First point for xyIntegration
 * @param [options.to] - Last value for xyIntegration in the X scale
 * @param [options.toIndex=x.length-1] - Last point for xyIntegration
 * @returns Max y on the specified range
 */
export function xyMaxY(
  data: DataXYZ = {},
  options: {
    from?: number;
    fromIndex?: number;
    toIndex?: number;
    to?: number;
  } = {},
): number {
  xyCheck(data);
  const { x, y } = data;
  if (x === undefined || y === undefined || x.length < 2) return 0;

  const { fromIndex, toIndex } = xGetFromToIndex(x, options);

  let currentxyMaxY = y[fromIndex];
  for (let i = fromIndex; i <= toIndex; i++) {
    if (y[i] > currentxyMaxY) currentxyMaxY = y[i];
  }

  return currentxyMaxY;
}
