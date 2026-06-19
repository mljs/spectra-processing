import type { DataXY, FromTo } from 'cheminfo-types';

import { zonesNormalize } from '../zones/index.ts';

import { xyCheck } from './xyCheck.ts';

export interface XYSetYValueOptions {
  zones?: FromTo[];

  /** Value to assign to y within the specified zones. Defaults to `0`. */
  value?: number;
}

/**
 * Set a value (default 0) to specific zones.
 * @param data - object that contains property x (an ordered increasing array) and y (an array).
 * @param options - options.
 * @returns data with y values set to the given value in the specified zones.
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
