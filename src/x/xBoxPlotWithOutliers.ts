import type { NumberArray } from 'cheminfo-types';

import { getSortedFloat64 } from './getSortedFloat64.ts';
import { boxPlotFromSorted } from './xBoxPlot.ts';
import { xCheck } from './xCheck.ts';

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
  xCheck(array);
  const sorted = getSortedFloat64(array);
  return boxPlotWithOutliersFromSorted(sorted);
}

/**
 * Calculating the box plot with outliers of an already-sorted array, without copying
 * or re-sorting. Because the array is sorted, the outliers are the low prefix and the
 * high suffix, so they are reported in ascending order.
 * Internal helper: not re-exported from `x/index.ts`, so it stays out of the public API.
 * @param sorted - sorted data.
 * @returns - q1, median, q3, min, max, outliers
 */
export function boxPlotWithOutliersFromSorted(
  sorted: Float64Array,
): XBoxPlotWithOutliers {
  const boxPlot = boxPlotFromSorted(sorted);

  if (boxPlot.max - boxPlot.min <= Number.EPSILON) {
    return {
      ...boxPlot,
      lowerWhisker: boxPlot.min,
      upperWhisker: boxPlot.max,
      minWhisker: boxPlot.min,
      maxWhisker: boxPlot.max,
      iqr: 0,
      outliers: [],
    };
  }

  const iqr = boxPlot.q3 - boxPlot.q1;
  const lowerWhisker = boxPlot.q1 - 1.5 * iqr;
  const upperWhisker = boxPlot.q3 + 1.5 * iqr;

  // non-outliers form a contiguous range [lowIndex, highIndex) in the sorted array
  let lowIndex = 0;
  while (lowIndex < sorted.length && sorted[lowIndex] < lowerWhisker) {
    lowIndex++;
  }
  let highIndex = sorted.length;
  while (highIndex > lowIndex && sorted[highIndex - 1] > upperWhisker) {
    highIndex--;
  }

  const outliers = [];
  for (let i = 0; i < lowIndex; i++) {
    outliers.push(sorted[i]);
  }
  for (let i = highIndex; i < sorted.length; i++) {
    outliers.push(sorted[i]);
  }

  return {
    ...boxPlot,
    lowerWhisker,
    upperWhisker,
    minWhisker: sorted[lowIndex],
    maxWhisker: sorted[highIndex - 1],
    iqr,
    outliers,
  };
}
