import type { NumberArray } from 'cheminfo-types';

import { xFindClosestIndex } from './xFindClosestIndex.ts';

export interface XGetFromToIndexOptions {
  /**
   * Start index (0-based, clamped to array bounds). Takes precedence over `from`.
   * @default 0
   */
  fromIndex?: number;

  /**
   * End index (0-based, clamped to array bounds). Takes precedence over `to`.
   * @default x.length-1
   */
  toIndex?: number;

  /**
   * Start value in the x scale; resolved to the nearest index.
   * @default x[0]
   */
  from?: number;

  /**
   * End value in the x scale; resolved to the nearest index.
   * @default x[x.length-1]
   */
  to?: number;
}

/**
 * Returns an object with {fromIndex, toIndex} for a specific from / to
 * @param x - array of numbers
 * @param options - options.
 */
export function xGetFromToIndex(
  x: NumberArray,
  options: XGetFromToIndexOptions = {},
): { fromIndex: number; toIndex: number } {
  let { fromIndex, toIndex } = options;
  const { from, to } = options;

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
  if (fromIndex < 0) fromIndex = 0;
  if (toIndex < 0) toIndex = 0;
  if (fromIndex >= x.length) fromIndex = x.length - 1;
  if (toIndex >= x.length) toIndex = x.length - 1;

  if (fromIndex > toIndex) [fromIndex, toIndex] = [toIndex, fromIndex];
  return { fromIndex, toIndex };
}
