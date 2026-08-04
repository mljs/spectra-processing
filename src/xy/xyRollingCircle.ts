import type { DataXY } from 'cheminfo-types';

import type { PointWithIndex } from '../types/index.ts';

import type { RollingCircleOptions } from './utils/rollingCircle.ts';
import { rollingCircle } from './utils/rollingCircle.ts';

export type XYRollingCircleOptions = RollingCircleOptions;

export interface XYRollingCircleResult {
  /**
   * The y position of the rolling shape for each x value. This is exactly what
   * `xyRollingCircleTransform` returns.
   */
  y: Float64Array;
  /**
   * The data points that are touched by the rolling shape, sorted by increasing
   * x. They are the points supporting the curve.
   */
  points: PointWithIndex[];
}

/**
 * Rolls a circle (or an ellipse when `yRadius` / `relativeYRadius` is used) along
 * the data and returns the resulting curve together with the points it touches.
 *
 * The touched points are the ones supporting the curve. With
 * `position: 'bottom'` and `shifted: false` they are the anchor points of a
 * baseline, and with `position: 'top'` they are the points lying on the upper
 * hull of the data.
 *
 * `xyRollingCircleTransform` is the shortcut returning only `y`.
 * @param data - data with x and y arrays.
 * @param options - options.
 * @returns the curve and the points it touches.
 */
export function xyRollingCircle(
  data: DataXY,
  options: XYRollingCircleOptions = {},
): XYRollingCircleResult {
  const { y, touching } = rollingCircle(data, { ...options, touching: true });

  const points: PointWithIndex[] = [];
  if (touching) {
    for (let i = 0; i < touching.length; i++) {
      if (touching[i] === 1) {
        points.push({ x: data.x[i], y: data.y[i], index: i });
      }
    }
  }

  return { y, points };
}
