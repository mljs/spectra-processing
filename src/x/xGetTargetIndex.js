import { xFindClosestIndex } from './xFindClosestIndex';

/**
 *  Returns the targetIndex
 *
 * @param {Array} [x]
 * @param {object} [options={}]
 * @param {number} [options.target]
 * @param {number} [options.targetIndex=0]
 * @param {number}
 */

/**
 * @param x
 * @param options
 */
export function xGetTargetIndex(x, options = {}) {
  let { target, targetIndex } = options;
  if (targetIndex === undefined) {
    if (target !== undefined) {
      return xFindClosestIndex(x, target);
    } else {
      return 0;
    }
  }
  return targetIndex;
}
