import { DataXYZ } from '..';
import { xGetFromToIndex } from '../x/xGetFromToIndex';

import { xyCheck } from './xyCheck';
/**
 * Finds the max value in a zone
 *
 * @param data - Object that contains property x (an ordered increasing array) and y (an array)
 * @param options - Options
 * @returns - Max y on the specified range
 */
export function xyMaxY(
  data: DataXYZ = {},
  options: {
    /**
     * First value for xyIntegration in the X scale
     */
    from?: number;
    /**
     * First point for xyIntegration
     * @default 0
     * */
    fromIndex?: number;
    /**
     *  Last point for xyIntegration
     * @default x.length-1
     * */
    toIndex?: number;
    /**
     * Last value for xyIntegration in the X scale
     */
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
