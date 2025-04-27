import type { NumberArray } from 'cheminfo-types';

import { xBoxPlot } from './xBoxPlot';

export interface XBoxPlotWithOutliers {
  /**
   * The minimum value of the number array
   */
  min: number;
  /**
   * q1 - 1.5 * IQR
   */
  lowerWhisker: number;
  /**
   * The minimum value of the number array that is not an outlier
   */
  minWhisker: number;
  /**
   * The first quartile of the number array
   */
  q1: number;
  /**
   * The median of the number array
   */
  median: number;
  /**
   * The third quartile of the number array
   */
  q3: number;
  /**
   * q3 + 1.5 * IQR
   */
  maxWhisker: number;
  /**
   * The maximal value of the number array that is not an outlier
   */
  upperWhisker: number;
  /**
   * The maximum value of the number array
   */
  max: number;
  /**
   * q3 - q1
   */
  iqr: number;
  /**
   * The outliers of the number array based on 1.5 * IQR
   */
  outliers: number[];
}

/**
 * Calculating the box plot of the array with outliers
 * Values are outliers if they are below Q1 - 1.5 * IQR or above Q3 + 1.5 * IQR
 * @param array - data
 * @returns - q1, median, q3, min, max, outliers
 */
export function xBoxPlotWithOutliers(array: NumberArray): XBoxPlotWithOutliers {
  const boxPlot = xBoxPlot(array);

  const iqr = boxPlot.q3 - boxPlot.q1;
  const lowerWhisker = boxPlot.q1 - 1.5 * iqr;
  const upperWhisker = boxPlot.q3 + 1.5 * iqr;

  const outliers = [];
  let minWhisker = boxPlot.median;
  let maxWhisker = boxPlot.median;
  for (const value of array) {
    if (value < lowerWhisker || value > upperWhisker) {
      outliers.push(value);
    } else {
      if (value < minWhisker) minWhisker = value;
      if (value > maxWhisker) maxWhisker = value;
    }
  }

  const info: XBoxPlotWithOutliers = {
    ...boxPlot,
    lowerWhisker,
    upperWhisker,
    minWhisker,
    maxWhisker,
    iqr,
    outliers,
  };

  return info;
}
