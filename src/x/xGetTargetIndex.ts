import { ArrayType } from '..';

import { xFindClosestIndex } from './xFindClosestIndex';

/**
 *  Returns the targetIndex
 *
 * @param {ArrayType} [x] array of numbers
 * @param {object} [options={}] options
 * @param {number} [options.target] target
 * @param {number} [options.targetIndex=0] targetindex
 *@returns {number} results
 */
export function xGetTargetIndex(
  x: ArrayType,
  options: {
    target?: number;
    targetIndex?: number;
  } = {},
): number {
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
