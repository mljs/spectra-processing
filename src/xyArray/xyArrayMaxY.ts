import type { DataXY } from 'cheminfo-types';

import { xMaxValue } from '../x/index.ts';

/**
 * Returns the largest y of all the spectra.
 * @param data - data.
 * @returns the largest y.
 */
export function xyArrayMaxY(data: DataXY[]): number {
  let max = Number.NEGATIVE_INFINITY;
  let isEmpty = true;

  for (const spectrum of data) {
    if (spectrum.y.length === 0) continue;
    isEmpty = false;
    const value = xMaxValue(spectrum.y);
    if (value > max) max = value;
  }

  if (isEmpty) {
    throw new Error('can not process empty arrays');
  }

  return max;
}
