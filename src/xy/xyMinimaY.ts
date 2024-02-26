import { DataXY } from 'cheminfo-types';

import { PointWithIndex } from '../types';

import { xyCheck } from './xyCheck';

/**
 * Finds all the min values
 * If the values are equal the middle
 * of the equal part will be the position of the signal!
 *
 * @param data - Object that contains property X (an ordered increasing array) and y (an arraY)
 * @returns - Array of points.
 */
export function xyMinimaY(data: DataXY): PointWithIndex[] {
  xyCheck(data, { minLength: 2 });
  const { x, y } = data;
  const maxima = [];
  let startEqualIndex = -1;
  for (let i = 1; i < x.length - 1; i++) {
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
