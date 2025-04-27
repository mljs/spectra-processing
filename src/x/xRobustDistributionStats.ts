import type { NumberArray } from 'cheminfo-types';

import { xBoxPlotWithOutliers } from './xBoxPlotWithOutliers';
import type { XBoxPlotWithOutliers } from './xBoxPlotWithOutliers';
import { xMean } from './xMean';
import { xStandardDeviation } from './xStandardDeviation';

export interface XRobustDistributionStats extends XBoxPlotWithOutliers {
  mean: number;
  sd: number;
  nb: number;
}

/**
 * Calculate distribution statistics of an array without providing options. Statistics
 * like sd and mean are calculated after removing outliers.
 * This ensure that the statistics are calculated in the same way in all the packages
 * If the array is empty it will throw an error
 * If the array has a length of 1, sd will be NaN (unbiased calculation of sd)
 * @param array - data
 * @param options
 * @returns - q1, median, q3, min, max
 */
export function xRobustDistributionStats(
  array: NumberArray,
): XRobustDistributionStats {
  const boxPlot = xBoxPlotWithOutliers(array);
  let filteredArray: NumberArray;
  if (boxPlot.outliers.length === 0) {
    filteredArray = array;
  } else {
    filteredArray = new Float64Array(array.length - boxPlot.outliers.length);
    let j = 0;
    for (const element of array) {
      if (element >= boxPlot.min && element <= boxPlot.max) {
        filteredArray[j++] = element;
      }
    }
  }

  return {
    ...boxPlot,
    mean: xMean(filteredArray),
    sd: xStandardDeviation(filteredArray),
    nb: filteredArray.length,
  };
}
