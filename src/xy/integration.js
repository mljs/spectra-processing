import { getFromToIndex } from '../x/getFromToIndex';

import { check } from './check';

/**
 * In place modification of the 2 arrays to make X unique and sum the Y if X has the same value
 * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
 * @param {object} [options={}]
 * @param {number} [options.from] - First value for integration in the X scale
 * @param {number} [options.fromIndex=0] - First point for integration
 * @param {number} [options.to] - Last value for integration in the X scale
 * @param {number} [options.toIndex=x.length-1] - Last point for integration
 * @return {number} Integration value on the specified range
 */

export function integration(points = {}, options = {}) {
  check(points);
  const { x, y } = points;
  if (x.length < 2) return 0;
  const { fromIndex, toIndex } = getFromToIndex(x, options);
  let currentIntegration = 0;
  for (let i = fromIndex; i < toIndex; i++) {
    currentIntegration += ((x[i + 1] - x[i]) * (y[i + 1] + y[i])) / 2;
  }

  return currentIntegration;
}
