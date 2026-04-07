import type { DataXY } from 'cheminfo-types';

/**
 * Computes the weighted median of the x values, using the y values as weights.
 * This is the x value that splits the total weight (sum of y) into two equal halves.
 * If the cumulative weight lands exactly at 50%, the result is the average of the two surrounding x values.
 * @param data - x should be sorted in increasing order, y values are used as weights and should be non-negative.
 * @returns The weighted median x value, or NaN if the data is empty.
 */
export function xyMedian(data: DataXY): number {
  const { x, y } = data;

  let sumY = 0;
  let cumSumY = 0;
  let i;

  if (x.length === 0) {
    return Number.NaN;
  }

  if (x.length === 1) {
    return x[0];
  }

  for (i = 0; i < y.length; i++) {
    sumY += y[i];
  }

  for (i = 0; i < y.length; i++) {
    cumSumY += y[i];
    if (cumSumY > sumY / 2) {
      return x[i];
    } else if (cumSumY === sumY / 2) {
      return 0.5 * (x[i] + x[i + 1]);
    }
  }
  return Number.NaN;
}
