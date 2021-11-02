import { ArrayType } from '..';

import { xFindClosestIndex } from './xFindClosestIndex';

/**.
 *  Returns the targetIndex
 *
 * @param [x] array of numbers
 * @param [options={}] options
 * @param [options.target] target
 * @param [options.targetIndex=0] targetindex
 *@returns results
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
