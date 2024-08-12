import { DataXY } from 'cheminfo-types';

import { PointWithIndex } from '../types';
import { xFindClosestIndex } from '../x';

import { xyCheck } from './xyCheck';

export interface XYMinClosestYPointOptions {
  target?: number;
  /**@default 0 */
  targetIndex?: number;
}

/**
 * Find the closest minimum going down hill
 * @param data - Object that contains property x (an ordered increasing array) and y (an array)
 * @param options - Options
 * @returns - An object with the x/y value
 */
export function xyMinClosestYPoint(
  data: DataXY,
  options: XYMinClosestYPointOptions = {},
): PointWithIndex {
  xyCheck(data);
  const { x, y } = data;

  const { target } = options;
  let { targetIndex } = options;

  if (targetIndex === undefined) {
    if (target !== undefined) {
      targetIndex = xFindClosestIndex(x, target);
    } else {
      targetIndex = 0;
    }
  }

  let previousIndex = Number.MIN_SAFE_INTEGER;
  let currentIndex = targetIndex;

  let minY = y[targetIndex];

  while (currentIndex !== previousIndex) {
    previousIndex = currentIndex;
    if (currentIndex > 0 && y[currentIndex - 1] < minY) {
      currentIndex--;
    } else if (currentIndex < x.length - 1 && y[currentIndex + 1] < minY) {
      currentIndex++;
    }
    minY = y[currentIndex];
  }
  return {
    x: x[currentIndex],
    y: y[currentIndex],
    index: currentIndex,
  };
}
