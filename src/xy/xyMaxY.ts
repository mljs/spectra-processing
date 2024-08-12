import { DataXY } from 'cheminfo-types';

import { xGetFromToIndex } from '../x';

import { xyCheck } from './xyCheck';

export interface XYMaxYOptions {
  /**
   * First value for xyMaxY in the X scale
   */
  from?: number;

  /**
   * First point for xyMaxY
   * @default 0
   */
  fromIndex?: number;

  /**
   *  Last point for xyMaxY
   * @default x.length-1
   */
  toIndex?: number;

  /**
   * Last value for xyMaxY in the X scale
   */
  to?: number;
}

/**
 * Finds the max value in a zone
 * @param data - Object that contains property x (an ordered increasing array) and y (an array)
 * @param options - Options
 * @returns - Max y on the specified range
 */

export function xyMaxY(data: DataXY, options: XYMaxYOptions = {}): number {
  xyCheck(data);
  const { x, y } = data;

  const { fromIndex, toIndex } = xGetFromToIndex(x, options);

  let currentxyMaxY = y[fromIndex];
  for (let i = fromIndex; i <= toIndex; i++) {
    if (y[i] > currentxyMaxY) currentxyMaxY = y[i];
  }

  return currentxyMaxY;
}
