import { DataXY } from 'cheminfo-types';

import { xFindClosestIndex } from '../x';

import { xyCheck } from './xyCheck';

export interface XYPeakInfoOptions {
  targetIndex?: number;
  target?: number;
}

export interface XYPeakInfo {
  inflectionAfter: { x: number; y: number };
  inflectionBefore: { x: number; y: number };
  width: number;
  extrema: { x: number; y: number };
  inflectionMiddle: { x: number; y: number };
}

/**
 * Returns an information about a signal.
 *
 *
 * We expect ordered data and equidistant X axis
 * You can use the method helper if required:
 * ML.ArrayPoints.uniqueX
 * ML.ArrayPoints.sortX
 * ML.ArrayPoints.equallySpaced
 * @param data - Object that contains property x (an ordered increasing array) and y (an array)
 * @param options - options
 * @returns - Information about signal
 */
export function xyPeakInfo(
  data: DataXY,
  options: XYPeakInfoOptions = {},
): XYPeakInfo | undefined {
  xyCheck(data);
  const { x, y } = data;
  if (x === undefined || y === undefined || x.length < 3) {
    return;
  }
  const { target } = options;
  let { targetIndex } = options;
  if (targetIndex === undefined && target !== undefined) {
    targetIndex = xFindClosestIndex(x, target);
  }

  if (targetIndex === undefined) {
    throw new Error('must specify target or targetIndex');
  }

  let i = targetIndex;
  let currentDiff = y[i] - y[i + 1];

  const multiplier = currentDiff < 0 ? -1 : 1;
  currentDiff *= multiplier;
  while (i < x.length - 1) {
    i++;
    const newDiff = (y[i] - y[i + 1]) * multiplier;
    if (newDiff < currentDiff) break;
    currentDiff = newDiff;
  }
  const after = { x: x[i], y: y[i] };

  i = targetIndex;
  currentDiff = (y[i] - y[i - 1]) * multiplier;
  while (i > 1) {
    i--;
    const newDiff = (y[i] - y[i - 1]) * multiplier;
    if (newDiff < currentDiff) break;
    currentDiff = newDiff;
  }
  const before = { x: x[i], y: y[i] };

  return {
    inflectionBefore: before,
    inflectionAfter: after,
    extrema: { x: x[targetIndex], y: y[targetIndex] },
    inflectionMiddle: {
      x: (before.x + after.x) / 2,
      y: (before.y + after.y) / 2,
    },
    width: Math.abs(before.x - after.x),
  };
}
