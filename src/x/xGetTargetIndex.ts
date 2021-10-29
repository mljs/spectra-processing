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
interface OptionsType {
  target?: number;
  targetIndex?: number;
}
/**
 * @param {number[]} x array of number
 * @param {OptionsType} options options
 * @returns {number} results
 */
export function xGetTargetIndex(
  x: number[] | Float64Array | Float32Array | Uint16Array,
  options: OptionsType = {},
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
