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
  const { target, targetIndex } = options;
  if (typeof targetIndex === 'undefined') {
    if (typeof target !== 'undefined') {
      return xFindClosestIndex(x, target);
    } else {
      return 0;
    }
  }
  return targetIndex;
}
