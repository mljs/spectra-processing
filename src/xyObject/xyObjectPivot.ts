import type { PointXY } from 'cheminfo-types';

import { xyObjectMinMaxValues } from './xyObjectMinMaxValues';

interface XYObjectPivotOptions {
  /**
   * lower extremity to search the pivot
   * @default minX
   */
  from?: number;
  /**
   * upper extremity to search the pivot
   * @default maxX
   */
  to?: number;
  /**
   * A factor to determine the threshold for peak detection based on the maximum y value.
   * @default 0.2
   */
  thresholdFactor?: number;
}

/**
 * Finds the pivot point in an array of points based on specified options.
 * @param points - An array of points where each point is an object with `x` and `y` properties.
 * @param options - Optional parameters to customize the pivot point selection.
 * @returns The pivot point object with `x` and `y` properties, or `null` if no suitable point is found.
 */
export function xyObjectPivot(
  points: PointXY[],
  options: XYObjectPivotOptions = {},
) {
  if (points.length === 0) return null;

  const { minX, maxX, maxY } = xyObjectMinMaxValues(points);
  const { thresholdFactor = 0.2 } = options;
  let { from = minX, to = maxX } = options;

  if (from > to) [from, to] = [to, from];

  let pointIndex = -1;
  const threshold = thresholdFactor * maxY;
  let minDistance = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < points.length; i++) {
    const { x, y } = points[i];
    const distance = Math.min(Math.abs(x - from), Math.abs(x - to));
    if (y >= threshold && distance < minDistance) {
      pointIndex = i;
      minDistance = distance;
    }
  }

  return points[pointIndex] ?? null;
}
