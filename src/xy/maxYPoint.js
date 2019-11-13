import { getFromToIndex } from '../x/getFromToIndex';

import { check } from './check';
/**
 * Finds the max y value in a range and return a {x,y} point
 * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
 * @param {object} [options={}]
 * @param {number} [options.from] - First value for integration in the X scale
 * @param {number} [options.fromIndex=0] - First point for integration
 * @param {number} [options.to] - Last value for integration in the X scale
 * @param {number} [options.toIndex=x.length-1] - Last point for integration
 * @return {object}
 */

export function maxYPoint(points = {}, options = {}) {
  check(points);
  const { x, y } = points;
  if (x.length < 2) return 0;

  const { fromIndex, toIndex } = getFromToIndex(x, options);

  let current = { x: x[fromIndex], y: y[fromIndex], index: fromIndex };
  for (let i = fromIndex; i <= toIndex; i++) {
    if (y[i] > current.y) current = { x: x[i], y: y[i], index: i };
  }

  return current;
}
