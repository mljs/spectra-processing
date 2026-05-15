import type { DataXY } from 'cheminfo-types';

import { xMedian } from '../x/xMedian.ts';

export interface XYMedianYOptions {
  /** Number of points in the sliding window. Must be odd. Defaults to `5`. */
  windowSize?: number;
}

/**
 * Computes the median of Y values in a sliding window around each point.
 * @param data - Object with x and y arrays of the same length.
 * @param options - Options for the median computation.
 * @returns A new DataXY with the same x values and smoothed y values.
 */
export function xyMedianY(
  data: DataXY,
  options: XYMedianYOptions = {},
): DataXY {
  const { windowSize = 5 } = options;
  const { x, y } = data;

  const halfWindow = Math.floor(windowSize / 2);
  const result = new Float64Array(y.length);

  for (let i = 0; i < y.length; i++) {
    const fromIndex = Math.max(0, i - halfWindow);
    const toIndex = Math.min(y.length, i + halfWindow + 1);
    const window = ArrayBuffer.isView(y)
      ? y.subarray(fromIndex, toIndex)
      : y.slice(fromIndex, toIndex);
    result[i] = xMedian(window, { exact: false });
  }

  return { x, y: result };
}
