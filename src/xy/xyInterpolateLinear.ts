import type { DataXY, DoubleArray } from 'cheminfo-types';

import { xyCheck } from './xyCheck.ts';

/**
 * Interpolate y values at target x positions using linear interpolation.
 * This is useful for upsampling or resampling data to specific x positions.
 * Both the input data and target x values must be sorted in ascending order.
 * Uses a two-pointer approach with O(n + m) complexity.
 * @param data - Object that contains property x (an ordered increasing array) and y (an array)
 * @param xTarget - Target x positions where y values should be interpolated
 * @returns - Interpolated y values at target x positions
 */
export function xyInterpolateLinear(
  data: DataXY,
  xTarget: DoubleArray,
): Float64Array {
  xyCheck(data);
  const { x, y } = data;

  if (x.length === 0) {
    return new Float64Array(0);
  }

  const result = new Float64Array(xTarget.length);
  let sparseIndex = 0;

  for (let i = 0; i < xTarget.length; i++) {
    const targetX = xTarget[i];

    // Move sparse index forward while we can
    while (sparseIndex < x.length - 1 && x[sparseIndex + 1] < targetX) {
      sparseIndex++;
    }

    // Handle edge cases
    if (sparseIndex === 0 && targetX <= x[0]) {
      // Before first point
      if (x.length === 1) {
        result[i] = y[0];
      } else {
        // Extrapolate using first two points
        const t = (targetX - x[0]) / (x[1] - x[0]);
        result[i] = y[0] * (1 - t) + y[1] * t;
      }
    } else if (sparseIndex >= x.length - 1) {
      // After last point
      result[i] = y[x.length - 1];
    } else {
      // Normal interpolation between two points
      const leftIdx = sparseIndex;
      const rightIdx = sparseIndex + 1;
      const t = (targetX - x[leftIdx]) / (x[rightIdx] - x[leftIdx]);
      result[i] = y[leftIdx] * (1 - t) + y[rightIdx] * t;
    }
  }

  return result;
}
