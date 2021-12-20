import { DataXY } from 'cheminfo-types';

import { xFindClosestIndex } from '../x/xFindClosestIndex';

import { xyCheck } from './xyCheck';

/**
 * Find the closest maximum going up hill
 *
 * @param data - Object that contains property x (an ordered increasing array) and y (an array)
 * @param options - options
 * @returns - An object with the x/y value
 */
export function xyMaxClosestYPoint(
  data: DataXY,
  options: {
    target?: number;
    /**@default 0 */
    targetIndex?: number;
  } = {},
): { x: number; y: number; index: number } {
  xyCheck(data);
  const { x, y } = data;

  let { target, targetIndex } = options;

  if (targetIndex === undefined) {
    if (target !== undefined) {
      targetIndex = xFindClosestIndex(x, target);
    } else {
      targetIndex = 0;
    }
  }

  let previousIndex = Number.MIN_SAFE_INTEGER;
  let currentIndex = targetIndex;

  let xyMaxY = y[targetIndex];

  while (currentIndex !== previousIndex) {
    previousIndex = currentIndex;
    if (currentIndex > 0 && y[currentIndex - 1] > xyMaxY) {
      currentIndex--;
    } else if (currentIndex < x.length - 1 && y[currentIndex + 1] > xyMaxY) {
      currentIndex++;
    }
    xyMaxY = y[currentIndex];
  }
  return {
    x: x[currentIndex],
    y: y[currentIndex],
    index: currentIndex,
  };
}
