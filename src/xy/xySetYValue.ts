import { DataXY, FromTo } from 'cheminfo-types';

import { zonesNormalize } from '../zones';

import { xyCheck } from './xyCheck';

export interface XYSetYValueOptions {
  zones?: FromTo[];

  /** data contains x and y values */
  value?: number;
}

/**
 * Set a value (default 0) to specific zones.
 * @param data - Object that contains property x (an ordered increasing array) and y (an array)
 * @param options - options
 * @returns - Array of points
 */
export function xySetYValue(
  data: DataXY,
  options: XYSetYValueOptions = {},
): DataXY {
  xyCheck(data);
  const { x, y } = data;
  const { value = 0 } = options;
  let { zones } = options;

  if (!Array.isArray(zones) || zones.length === 0) {
    return data;
  }

  zones = zonesNormalize(zones);

  const newX = x.slice();
  const newY = y.slice();

  let currentZone = zones[0];
  let position = 0;
  loop: for (let i = 0; i < x.length; i++) {
    while (currentZone.to < x[i]) {
      position++;
      currentZone = zones[position];
      if (!currentZone) {
        i = x.length;
        break loop;
      }
    }
    if (x[i] >= currentZone.from) {
      newY[i] = value;
    }
  }
  return { x: newX, y: newY };
}
