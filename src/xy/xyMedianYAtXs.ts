import type { DataXY, NumberArray } from 'cheminfo-types';

import { xFindClosestIndex } from '../x/xFindClosestIndex.ts';
import { xMedian } from '../x/xMedian.ts';

export interface XYMedianYAtXsOptions {
  /** Number of points in the sliding window. Must be odd. Defaults to `5`. */
  windowSize?: number;
  /**
   * If true, the window shrinks on both sides so that it stays centered on the
   * closest index when points are missing on one side (near an edge).
   * @default false
   */
  symmetric?: boolean;
}

/**
 * Computes the median of Y values in a sliding window around each target x position.
 * For each value in xValues, the closest index in data.x is found and the median
 * of the surrounding y values (within the window) is returned.
 * @param data - object with x (sorted in increasing order) and y arrays of the same length.
 * @param xValues - array of x positions at which to compute the median.
 * @param options - options for the median computation.
 * @returns A new DataXY with x = xValues and y = computed medians.
 */
export function xyMedianYAtXs(
  data: DataXY,
  xValues: NumberArray,
  options: XYMedianYAtXsOptions = {},
): DataXY {
  const { windowSize = 5, symmetric = false } = options;
  const { x, y } = data;

  const halfWindow = Math.floor(windowSize / 2);
  const lastIndex = y.length - 1;
  const result = new Float64Array(xValues.length);

  for (let i = 0; i < xValues.length; i++) {
    const centerIndex = xFindClosestIndex(x, xValues[i]);
    let currentHalfWindow = halfWindow;
    if (symmetric) {
      if (centerIndex < currentHalfWindow) currentHalfWindow = centerIndex;
      if (lastIndex - centerIndex < currentHalfWindow) {
        currentHalfWindow = lastIndex - centerIndex;
      }
    }
    const fromIndex = Math.max(0, centerIndex - currentHalfWindow);
    const toIndex = Math.min(y.length, centerIndex + currentHalfWindow + 1);
    result[i] = xMedian(y, { exact: false, fromIndex, toIndex });
  }

  return { x: xValues, y: result };
}
