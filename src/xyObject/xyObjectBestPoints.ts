import { Point } from '..';

import { xyObjectMaxXPoint } from './xyObjectMaxXPoint';
import { xyObjectMinXPoint } from './xyObjectMinXPoint';

/**
 *
 * Filter the array by taking the higher points (max y value) and only.
 * Keep one per slot.
 * There are 2 different slots, the smallest one will have the
 * new property `close` to true
 *
 * @param points - array of all the points
 * @param options - Options
 * @param options.from - min X value of the window to consider
 * @param options.to - max X value of the window to consider
 * @param options.limit - max number of points
 * @param options.threshold - minimal intensity compare to more intense point
 * @param options.numberCloseSlots - numberCloseSlots
 * @param options.numberSlots - define the number of slots and indirectly the slot width
 * @returns - copy of points with 'close' property
 */
export function xyObjectBestPoints(
  points: Point[],
  options: {
    from?: number;
    to?: number;
    /**@default 20 */
    limit?: number;
    /**@default 0.01 */
    threshold?: number;
    /**@default 50 */
    numberCloseSlots?: number;
    /**@default 10 */
    numberSlots?: number;
  } = {},
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
