import { DataXY } from 'cheminfo-types';

import { PointWithIndex } from '../types';
import { xGetFromToIndex, XGetFromToIndexOptions } from '../x/xGetFromToIndex';

import { xyCheck } from './xyCheck';

/**
 * Finds all the max values
 * If the values are equal the middle
 * of the equal part will be the position of the signal!
 * @param data - Object that contains property x (an ordered increasing array) and y (an array)
 * @param options - Object with from and to properties
 * @returns - Array of points
 */
export function xyMaximaY(
  data: DataXY,
  options: XGetFromToIndexOptions = {},
): PointWithIndex[] {
  xyCheck(data, { minLength: 2 });
  const { x, y } = data;
  const { fromIndex, toIndex } = xGetFromToIndex(x, options);
  const maxima: PointWithIndex[] = [];
  let startEqualIndex = -1;
  for (let i = fromIndex + 1; i < toIndex; i++) {
    if (y[i - 1] < y[i] && y[i + 1] < y[i]) {
      maxima.push({ x: x[i], y: y[i], index: i });
    } else if (y[i - 1] < y[i] && y[i + 1] === y[i]) {
      startEqualIndex = i;
    } else if (y[i - 1] === y[i] && y[i + 1] < y[i]) {
      const index = Math.floor((i + startEqualIndex) / 2);
      maxima.push({ x: x[index], y: y[index], index });
    }
  }
  return maxima;
}
