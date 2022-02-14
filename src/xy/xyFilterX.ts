import { DataXY } from 'cheminfo-types';

import getZones from '../zones/utils/getZones';

/** Filter an array x/y based on various criteria x points are expected to be sorted
 *
 * @param points - points
 * @param options - options
 * @return filtered array
 */

export function xyFilterX(
  points: DataXY,
  options: {
    /** filter from
     * @default x[0]
     */
    from?: number;
    /** filter to
     * @default x[x.length - 1]
     */
    to?: number;
    /** zones to exclude, contains {from, to} pairs
     * @default []
     */
    exclusions?: { from: number; to: number }[];
  } = {},
): DataXY {
  const { x, y } = points;
  const { from = x[0], to = x[x.length - 1], exclusions = [] } = options;

  let zones = getZones(from, to, exclusions);

  let currentZoneIndex = 0;
  let newX = [];
  let newY = [];
  let position = 0;
  while (position < x.length) {
    if (
      x[position] <= zones[currentZoneIndex].to &&
      x[position] >= zones[currentZoneIndex].from
    ) {
      newX.push(x[position]);
      newY.push(y[position]);
    } else {
      if (x[position] > zones[currentZoneIndex].to) {
        currentZoneIndex++;
        if (!zones[currentZoneIndex]) break;
      }
    }
    position++;
  }

  return {
    x: newX,
    y: newY,
  };
}
