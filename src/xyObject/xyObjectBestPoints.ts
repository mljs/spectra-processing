import { Point } from '..';

import { xyObjectMaxXPoint } from './xyObjectMaxXPoint';
import { xyObjectMinXPoint } from './xyObjectMinXPoint';

/**
 * Filter the array by taking the higher points (max y value) and only
 * keep one per slot.
 * There are 2 different slots, the smallest one will have the
 * new property `close` to true
 *
 * @param {Array} points - array of all the points
 * @param {Array<Point>} [options={}]
 * @param {number} [options.from] - min X value of the window to consider
 * @param {number} [options.to] - max X value of the window to consider
 * @param {number} [options.limit=20] - max number of points
 * @param {number} [options.threshold=0.01] - minimal intensity compare to more intense point
 * @param {number} [options.numberSlots=10] - define the number of slots and indirectly the slot width
 * @param {number} [options.numberCloseSlots=50]
 * @returns {Array<Point>} - copy of points with 'close' property
 */

interface OptionsType {
  from?: number;
  to?: number;
  limit?: number;
  threshold?: number;
  numberCloseSlots?: number;
  numberSlots?: number;
}
/**
 * @param {Array<Point>} points list of points
 * @param {OptionsType} options options
 * @returns {Array<Point>} list of points
 */
export function xyObjectBestPoints(
  points: Point[],
  options: OptionsType = {},
): Point[] {
  const {
    from = xyObjectMinXPoint(points).x,
    to = xyObjectMaxXPoint(points).x,
    limit = 20,
    threshold = 0.01,
    numberCloseSlots = 50,
    numberSlots = 10,
  } = options;
  let slot = (to - from) / numberSlots;
  let closeSlot = (to - from) / numberCloseSlots;
  let selected = points
    .filter((point) => point.x >= from && point.x <= to)
    .map((point) => {
      return {
        point,
        monoisotopic: false,
      };
    });

  selected = selected.sort((a, b) => {
    if (a.monoisotopic && !b.monoisotopic) return -1;
    if (b.monoisotopic && !a.monoisotopic) return 1;
    return b.point.y - a.point.y;
  });

  let toReturn: Point[] = [];
  if (selected.length === 0) return [];
  let minY = selected[0].point.y * threshold;
  peakLoop: for (let item of selected) {
    if (item.point.y < minY) {
      if (item.monoisotopic) {
        continue;
      } else {
        break;
      }
    }
    let close = false;
    for (let existing of toReturn) {
      if (Math.abs(existing.x - item.point.x) < closeSlot) {
        continue peakLoop;
      }
      if (Math.abs(existing.x - item.point.x) < slot) {
        close = true;
      }
    }
    let newPeak = JSON.parse(JSON.stringify(item.point));
    newPeak.close = close;
    toReturn.push(newPeak);
    if (toReturn.length === limit) break;
  }
  return toReturn.sort((a, b) => a.x - b.x);
}
