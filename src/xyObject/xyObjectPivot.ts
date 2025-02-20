import type { FromTo, PointXY } from 'cheminfo-types';

import { xyObjectMinMaxValues } from './xyObjectMinMaxValues';

interface XYObjectPivotOptions {
  /**
   * An object specifying the range { from, to } within which to search for the peak.
   * @default { from: minX, to: maxX }
   */
  fromTo?: FromTo;
  /**
   * A factor to determine the threshold for peak detection based on the maximum y value.
   * @default 0.2
   */
  thresholdFactor?: number;
}

/**
 * Finds the index of the peak in an array of points (x, y) based on a threshold factor in Y values and a specified range in X values.
 * @param arr - Array of points where each point is an object with x and y properties.
 * @param options - Optional parameters to configure the pivot search.
 * @param options.fromTo - An object specifying the range { from, to } within which to search for the peak. Defaults to the range of x values in the array.
 * @param options.thresholdFactor - A factor to determine the threshold for peak detection based on the maximum y value. Defaults to 0.2.
 * @returns The index of the peak point in the array. If no peak is found, returns -1.
 */
export function xyObjectPivot(
  arr: PointXY[],
  options: XYObjectPivotOptions = {},
): number {
  if (arr.length === 0) return -1;

  const { minX, maxX, maxY } = xyObjectMinMaxValues(arr);

  const { thresholdFactor = 0.2, fromTo = { from: minX, to: maxX } } = options;
  let { from, to } = fromTo;

  if (from > to) [from, to] = [to, from];

  let peakIndex = -1;
  const threshold = thresholdFactor * maxY;
  let minDistance = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < arr.length; i++) {
    const { x, y } = arr[i];
    const distance = Math.min(Math.abs(x - from), Math.abs(x - to));
    if (y >= threshold && distance < minDistance) {
      peakIndex = i;
      minDistance = distance;
    }
  }

  return peakIndex;
}
