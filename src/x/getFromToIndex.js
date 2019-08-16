import { findClosestIndex } from './findClosestIndex';

/**
 * Returns an object with {fromIndex, toIndex} for a specific from / to
 * @param {array} x
 * @param {object} [options={}]
 * @param {number} [options.from] - First value for integration in the X scale
 * @param {number} [options.fromIndex=0] - First point for integration
 * @param {number} [options.to] - Last value for integration in the X scale
 * @param {number} [options.toIndex=x.length-1] - Last point for integration
 */

export function getFromToIndex(x, options = {}) {
  let { fromIndex, toIndex, from, to } = options;

  if (fromIndex === undefined) {
    if (from !== undefined) {
      fromIndex = findClosestIndex(x, from);
    } else {
      fromIndex = 0;
    }
  }
  if (toIndex === undefined) {
    if (to !== undefined) {
      toIndex = findClosestIndex(x, to);
    } else {
      toIndex = x.length - 1;
    }
  }
  return { fromIndex, toIndex };
}
