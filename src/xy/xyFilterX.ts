import { DataXY, FromTo } from 'cheminfo-types';

import { zonesNormalize } from '../zones';

export interface XYFilterXOptions {
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
  exclusions?: FromTo[];
  /** zones to keep
   * @default [{from,to}]
   */
  zones?: FromTo[];
}

/** Filter an array x/y based on various criteria x points are expected to be sorted
 *
 * @param data - object containing 2 properties x and y
 * @param options - options
 * @return filtered array
 */
export function xyFilterX(
  data: DataXY,
  options: XYFilterXOptions = {},
): DataXY<number[]> {
  const { x, y } = data;
  const {
    from = x[0],
    to = x[x.length - 1],
    zones = [{ from, to }],
    exclusions = [],
  } = options;

  const normalizedZones = zonesNormalize(zones, { from, to, exclusions });

  let currentZoneIndex = 0;
  const newX: number[] = [];
  const newY: number[] = [];
  let position = 0;
  while (position < x.length) {
    if (
      x[position] <= normalizedZones[currentZoneIndex].to &&
      x[position] >= normalizedZones[currentZoneIndex].from
    ) {
      newX.push(x[position]);
      newY.push(y[position]);
    } else if (x[position] > normalizedZones[currentZoneIndex].to) {
      currentZoneIndex++;
      if (!normalizedZones[currentZoneIndex]) break;
    }
    position++;
  }

  return {
    x: newX,
    y: newY,
  };
}
