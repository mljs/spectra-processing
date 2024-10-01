import { NumberArray } from 'cheminfo-types';

import { xBoxPlot, XBoxPlotOptions } from './xBoxPlot';

export interface XBoxPlotWithOutliers {
  q1: number;
  median: number;
  q3: number;
  min: number;
  max: number;
  outliers: number[];
}

/**
 * Calculating the box plot of the array with outliers
 * Values are outliers if they are below Q1 - 1.5 * IQR or above Q3 + 1.5 * IQR
 * @param array - data
 * @param options
 * @returns - q1, median, q3, min, max, outliers
 */
export function xBoxPlotWithOutliers(
  array: NumberArray,
  options: XBoxPlotOptions = {},
): XBoxPlotWithOutliers {
  const info: XBoxPlotWithOutliers = {
    ...xBoxPlot(array, options),
    outliers: [],
  };

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
  return info;
}
