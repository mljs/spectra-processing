import type { DataXY, NumberArray } from 'cheminfo-types';

import { xFindClosestIndex } from '../x/xFindClosestIndex.ts';
import { xMedian } from '../x/xMedian.ts';

export interface XYMedianYAtXsOptions {
  /** Number of points in the sliding window. Must be odd. Defaults to `5`. */
  windowSize?: number;
}

/**
 * Computes the median of Y values in a sliding window around each target x position.
 * For each value in xValues, the closest index in data.x is found and the median
 * of the surrounding y values (within the window) is returned.
 * @param data - Object with x (sorted in increasing order) and y arrays of the same length.
 * @param xValues - Array of x positions at which to compute the median.
 * @param options - Options for the median computation.
 * @returns A new DataXY with x = xValues and y = computed medians.
 */
export function xyMedianYAtXs(
  data: DataXY,
  xValues: NumberArray,
  options: XYMedianYAtXsOptions = {},
): DataXY {
  const { windowSize = 5 } = options;
  const { x, y } = data;

  const halfWindow = Math.floor(windowSize / 2);
  const result = new Float64Array(xValues.length);

  for (let i = 0; i < xValues.length; i++) {
    const centerIndex = xFindClosestIndex(x, xValues[i]);
    const fromIndex = Math.max(0, centerIndex - halfWindow);
    const toIndex = Math.min(y.length, centerIndex + halfWindow + 1);
    const window = ArrayBuffer.isView(y)
      ? y.subarray(fromIndex, toIndex)
      : y.slice(fromIndex, toIndex);
    result[i] = xMedian(window, { exact: false });
  }

  return { x: xValues, y: result };
}
