import { NumberArray } from 'cheminfo-types';

import { xFindClosestIndex } from './xFindClosestIndex';

export interface XGetTargetIndexOptions {
  target?: number;

  /**
   * @default 0
   */
  targetIndex?: number;
}

/**
 *  Returns the targetIndex
 * @param x - array of numbers
 * @param options - options
 */
export function xGetTargetIndex(
  x: NumberArray,
  options: XGetTargetIndexOptions = {},
): number {
  const { target, targetIndex } = options;
  if (targetIndex === undefined) {
    if (target !== undefined) {
      return xFindClosestIndex(x, target);
    } else {
      return 0;
    }
  }
  return targetIndex;
}
