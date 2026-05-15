import type { Point, PointWithClose } from '../types/index.ts';

import { xyObjectMaxXPoint } from './xyObjectMaxXPoint.ts';
import { xyObjectMinXPoint } from './xyObjectMinXPoint.ts';

export interface XYObjectBestPointsOptions {
  /**
   * min X value of the window to consider
   */
  from?: number;

  /**
   * max X value of the window to consider
   */
  to?: number;

  /**
   * max number of points
   * @default 20
   */
  limit?: number;

  /**
   * minimal intensity compare to more intense
   * @default 0.01
   */
  threshold?: number;

  /**
   * number of slots
   * @default 50
   */
  numberCloseSlots?: number;

  /**
   * define the number of slots and indirectly the slot width
   * @default 10
   */
  numberSlots?: number;
}

/**
 * Filter the array by taking the higher points (max y value) and only.
 * Keep one per slot. There are 2 different slots, the smallest one will have the
 * new property `close` to true
 * @param points - array of all the points
 * @param options - Options
 * @returns - copy of points with 'close' property
 */
export function xyObjectBestPoints(
  points: Point[],
  options: XYObjectBestPointsOptions = {},
): Point[] {
  const {
    from = xyObjectMinXPoint(points).x,
    to = xyObjectMaxXPoint(points).x,
    limit = 20,
    threshold = 0.01,
    numberCloseSlots = 50,
    numberSlots = 10,
  } = options;
  const slot = (to - from) / numberSlots;
  const closeSlot = (to - from) / numberCloseSlots;
  const selected = points
    .filter((point) => point.x >= from && point.x <= to)
    .map((point) => {
      return {
        point,
      };
    });

  selected.sort((a, b) => {
    return b.point.y - a.point.y;
  });

  const toReturn: PointWithClose[] = [];
  if (selected.length === 0) return [];
  const minY = selected[0].point.y * threshold;
  peakLoop: for (const item of selected) {
    if (item.point.y < minY) {
      break;
    }
    let close = false;
    for (const existing of toReturn) {
      if (Math.abs(existing.x - item.point.x) < closeSlot) {
        continue peakLoop;
      }
      if (Math.abs(existing.x - item.point.x) < slot) {
        close = true;
      }
    }
    const newPeak = { ...item.point, close };
    toReturn.push(newPeak);
    if (toReturn.length === limit) break;
  }
  toReturn.sort((a, b) => a.x - b.x);
  return toReturn;
}
