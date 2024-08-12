import { DataXY } from 'cheminfo-types';

import { PointWithIndex } from '../types';
import { xGetTargetIndex } from '../x';

import { xyCheck } from './xyCheck';

/**
 * Find the closest minimum going down hill
 * @param data - Object that contains property x (an ordered increasing array) and y (an array)
 * @param options - options
 * @returns - An object with the x/y value
 */
export function xyRealMaxYPoint(data: DataXY, options = {}): PointWithIndex {
  xyCheck(data);
  const { x, y } = data;
  const targetIndex = xGetTargetIndex(x, options);
  // interpolation to a sin() function
  if (
    y[targetIndex - 1] > 0 &&
    y[targetIndex + 1] > 0 &&
    y[targetIndex] >= y[targetIndex - 1] &&
    y[targetIndex] >= y[targetIndex + 1]
  ) {
    const alpha = 20 * Math.log10(y[targetIndex - 1]);
    const beta = 20 * Math.log10(y[targetIndex]);
    const gamma = 20 * Math.log10(y[targetIndex + 1]);
    const p = (0.5 * (alpha - gamma)) / (alpha - 2 * beta + gamma);
    return {
      x: x[targetIndex] + (x[targetIndex] - x[targetIndex - 1]) * p,
      y: y[targetIndex] - 0.25 * (y[targetIndex - 1] - y[targetIndex + 1]) * p,
      index: targetIndex,
    };
  } else {
    return {
      x: x[targetIndex],
      y: y[targetIndex],
      index: targetIndex,
    };
  }
}
