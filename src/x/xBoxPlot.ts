import { NumberArray } from 'cheminfo-types';

export interface XBoxPlotOptions {
  /**
   * By default, there should be at least 5 elements.
   * @default false
   */
  allowSmallArray?: boolean;

  /**
   * Calculate outliers (value < min-1.5IQR or value > max+1.5IQR). The min and max are recalculated without the outliers.
   * @default false
   */
  calculateOutliers?: boolean;
}

export interface XBoxPlot {
  q1: number;
  median: number;
  q3: number;
  min: number;
  max: number;
  outliers: number[];
}

/**
 * Calculating the box plot of the array
 * @param array - data
 * @param options
 */
export function xBoxPlot(
  array: NumberArray,
  options: XBoxPlotOptions = {},
): XBoxPlot {
  const { allowSmallArray = false, calculateOutliers = false } = options;
  if (array.length < 5) {
    if (allowSmallArray) {
      if (array.length === 0) {
        throw new Error('can not calculate info if array is empty');
      }
    } else {
      throw new Error(
        'can not calculate info if array contains less than 5 elements',
      );
    }
  }

  array = Float64Array.from(array).sort();

  const info: XBoxPlot = {
    q1: 0,
    median: 0,
    q3: 0,
    min: array[0],
    max: array.at(-1) as number,
    outliers: [],
  };
  let q1max, q3min;
  if (array.length % 2 === 1) {
    // odd
    const middle = (array.length - 1) / 2;
    info.median = array[middle];
    q1max = Math.max(middle - 1, 0);
    q3min = Math.min(middle + 1, array.length - 1);
  } else {
    // even
    q3min = array.length / 2;
    q1max = q3min - 1;
    info.median = (array[q1max] + array[q3min]) / 2;
  }
  if (q1max % 2 === 0) {
    info.q1 = array[q1max / 2];
    info.q3 = array[(array.length + q3min - 1) / 2];
  } else {
    info.q1 = (array[(q1max + 1) / 2] + array[(q1max - 1) / 2]) / 2;
    const middleOver = (array.length + q3min) / 2;
    info.q3 = (array[middleOver] + array[middleOver - 1]) / 2;
  }

  if (calculateOutliers) {
    const iqr = info.q3 - info.q1;
    const min = info.q1 - 1.5 * iqr;
    const max = info.q3 + 1.5 * iqr;
    // we need to recalculate the min and the max because they could be outliers
    info.min = info.median;
    info.max = info.median;
    for (const value of array) {
      if (value < min || value > max) {
        info.outliers.push(value);
      } else {
        if (value < info.min) info.min = value;
        if (value > info.max) info.max = value;
      }
    }
  }
  return info;
}
