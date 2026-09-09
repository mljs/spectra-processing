import type { DataXY } from 'cheminfo-types';

import { xyArrayMaxY } from './xyArrayMaxY.ts';

export function xyArrayFilterMinYValue(
  data: DataXY[],
  minRelativeYValue: number,
): Array<DataXY<number[]>>;
export function xyArrayFilterMinYValue(
  data: DataXY[],
  minRelativeYValue?: number,
): DataXY[];

/**
 * Removes from every spectrum the points whose y is below a fraction of the
 * largest y of the whole set.
 * Unlike `xyFilterMinYValue`, which uses the largest y of the spectrum it filters,
 * the threshold here is the same for all the spectra, so a weak spectrum may lose
 * every one of its points.
 * @param data - data.
 * @param minRelativeYValue - the minimum relative value compare to the global Y max value.
 * @returns the spectra without their smallest points, the data itself when there is nothing to filter on.
 */
export function xyArrayFilterMinYValue(
  data: DataXY[],
  minRelativeYValue?: number,
): DataXY[] {
  if (minRelativeYValue === undefined) return data;

  let total = 0;
  for (const spectrum of data) {
    total += spectrum.y.length;
  }
  const threshold = total === 0 ? 0 : xyArrayMaxY(data) * minRelativeYValue;

  // The threshold is a number and not a callback, so the comparison is inlined
  // rather than going through `xyFilter`, which costs 25% on 30 million points.
  return data.map((spectrum) => {
    const { x, y } = spectrum;
    const newX: number[] = [];
    const newY: number[] = [];
    for (let i = 0; i < y.length; i++) {
      if (y[i] >= threshold) {
        newX.push(x[i]);
        newY.push(y[i]);
      }
    }
    return { x: newX, y: newY };
  });
}
