import { findClosestIndex } from './findClosestIndex';

/**
 *  Returns the targetIndex
 * @param {array} [x]
 * @param {object} [options={}]
 * @param {number} [options.target]
 * @param {number} [options.targetIndex=0]
 * @param {number}
 */

export function getTargetIndex(x, options = {}) {
  let { target, targetIndex } = options;
  if (targetIndex === undefined) {
    if (target !== undefined) {
      return findClosestIndex(x, target);
    } else {
      return 0;
    }
  }
  return targetIndex;
}
