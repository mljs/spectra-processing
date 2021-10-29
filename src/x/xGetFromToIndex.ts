import { xFindClosestIndex } from './xFindClosestIndex';

/**
 * Returns an object with {fromIndex, toIndex} for a specific from / to
 *
 * @param {Array} x
 * @param {object} [options={}]
 * @param {number} [options.from] - First value for xyIntegration in the X scale
 * @param {number} [options.fromIndex=0] - First point for xyIntegration
 * @param {number} [options.to] - Last value for xyIntegration in the X scale
 * @param {number} [options.toIndex=x.length-1] - Last point for xyIntegration
 */

interface OptionsType {
  fromIndex?: number;
  toIndex?: number;
  from?: number;
  to?: number;
}
/**
 * @param {number[]} x array
 * @param {OptionsType} options options
 * @returns {{ fromIndex: number; toIndex: number }} result
 */
export function xGetFromToIndex(
  x: number[] | Float64Array | Float32Array | Uint16Array,
  options: OptionsType = {},
): { fromIndex: number; toIndex: number } {
  let { fromIndex, toIndex, from, to } = options;

  if (fromIndex === undefined) {
    if (from !== undefined) {
      fromIndex = xFindClosestIndex(x, from);
    } else {
      fromIndex = 0;
    }
  }
  if (toIndex === undefined) {
    if (to !== undefined) {
      toIndex = xFindClosestIndex(x, to);
    } else {
      toIndex = x.length - 1;
    }
  }
  if (fromIndex > toIndex) [fromIndex, toIndex] = [toIndex, fromIndex];
  return { fromIndex, toIndex };
}
