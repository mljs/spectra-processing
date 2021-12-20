import { DoubleArray } from 'cheminfo-types';

import { xFindClosestIndex } from './xFindClosestIndex';

/**
 * Returns an object with {fromIndex, toIndex} for a specific from / to
 *
 * @param x - array of numbers
 * @param options - Options
 */
export function xGetFromToIndex(
  x: DoubleArray,
  options: {
    /**
     * First point for xyIntegration
     * @default 0
     * */
    fromIndex?: number;
    /**
     * Last point for xyIntegration
     * @default x.length-1
     * */
    toIndex?: number;
    /**
     * First value for xyIntegration in the X scale
     * */
    from?: number;
    /**
     * Last value for xyIntegration in the X scale
     * */
    to?: number;
  } = {},
): { fromIndex: number; toIndex: number } {
  let { fromIndex, toIndex, from, to } = options;

  if (fromIndex === undefined) {
    if (from !== undefined) {
      fromIndex = xFindClosestIndex(x, from);
    } else {
      fromIndex = 0;
    }
  }
  if (toIndex === undefined) {
    if (to !== undefined) {
      toIndex = xFindClosestIndex(x, to);
    } else {
      toIndex = x.length - 1;
    }
  }
  if (fromIndex > toIndex) [fromIndex, toIndex] = [toIndex, fromIndex];
  return { fromIndex, toIndex };
}
