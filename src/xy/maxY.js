import { getFromToIndex } from '../x/getFromToIndex';

import { check } from './check';
/**
 * Finds the max value in a zone
 * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
 * @param {object} [options={}]
 * @param {number} [options.from] - First value for integration in the X scale
 * @param {number} [options.fromIndex=0] - First point for integration
 * @param {number} [options.to] - Last value for integration in the X scale
 * @param {number} [options.toIndex=x.length-1] - Last point for integration
 * @return {number} Max y on the specified range
 */

export function maxY(points = {}, options = {}) {
  check(points);
  const { x, y } = points;
  if (x.length < 2) return 0;

  const { fromIndex, toIndex } = getFromToIndex(x, options);

  let currentMaxY = y[fromIndex];
  for (let i = fromIndex; i <= toIndex; i++) {
    if (y[i] > currentMaxY) currentMaxY = y[i];
  }

  return currentMaxY;
}
