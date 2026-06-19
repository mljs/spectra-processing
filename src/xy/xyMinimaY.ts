import type { DataXY } from 'cheminfo-types';

import type { PointWithIndex } from '../types/index.ts';
import type { XGetFromToIndexOptions } from '../x/xGetFromToIndex.ts';
import { xGetFromToIndex } from '../x/xGetFromToIndex.ts';

import { xyCheck } from './xyCheck.ts';

/**
 * Finds all the min values
 * If the values are equal the middle
 * of the equal part will be the position of the signal!
 * @param data - object that contains property x (an ordered increasing array) and y (an array).
 * @param options - options with from and to properties.
 * @returns array of points.
 */
export function xyMinimaY(
  data: DataXY,
  options: XGetFromToIndexOptions = {},
): PointWithIndex[] {
  xyCheck(data, { minLength: 2 });
  const { x, y } = data;
  const { fromIndex, toIndex } = xGetFromToIndex(x, options);
  const maxima = [];
  let startEqualIndex = -1;
  for (let i = fromIndex + 1; i < toIndex; i++) {
    if (y[i - 1] > y[i] && y[i + 1] > y[i]) {
      maxima.push({ x: x[i], y: y[i], index: i });
    } else if (y[i - 1] > y[i] && y[i + 1] === y[i]) {
      startEqualIndex = i;
    } else if (y[i - 1] === y[i] && y[i + 1] > y[i]) {
      const index = Math.floor((i + startEqualIndex) / 2);
      maxima.push({ x: x[index], y: y[index], index });
    }
  }
  return maxima;
}
