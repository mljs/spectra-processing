import { DoubleArray } from 'cheminfo-types';

import { xFindClosestIndex } from './xFindClosestIndex';

/**
 *  Returns the targetIndex
 *
 * @param x - array of numbers
 * @param options - options
 */
export function xGetTargetIndex(
  x: DoubleArray,
  options: {
    target?: number;
    /**
     * @default 0
     */
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
