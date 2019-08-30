import { findClosestIndex } from '../x/findClosestIndex';

import { check } from './check';

/**
 * Find the closest maximum going up hill
 * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
 * @param {object} [options={}]
 * @param {number} [options.target]
 * @param {number} [options.targetIndex=0]
 * @return {{x,y,xIndex}} An object with the x/y value
 */

export function maxClosestYPoint(points, options = {}) {
  check(points);
  const { x, y } = points;

  let { target, targetIndex } = options;

  if (targetIndex === undefined) {
    if (target !== undefined) {
      targetIndex = findClosestIndex(x, target);
    } else {
      targetIndex = 0;
    }
  }

  let previousIndex = Number.MIN_SAFE_INTEGER;
  let currentIndex = targetIndex;

  let maxY = y[targetIndex];

  while (currentIndex !== previousIndex) {
    previousIndex = currentIndex;
    if (currentIndex > 0 && y[currentIndex - 1] > maxY) {
      currentIndex--;
    } else if (currentIndex < x.length - 1 && y[currentIndex + 1] > maxY) {
      currentIndex++;
    }
    maxY = y[currentIndex];
  }
  return {
    x: x[currentIndex],
    y: y[currentIndex],
    index: currentIndex,
  };
}
