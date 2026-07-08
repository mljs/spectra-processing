import type { NumberArray } from 'cheminfo-types';

import { getSortedFloat64 } from './getSortedFloat64.ts';
import type { XBoxPlotWithOutliers } from './xBoxPlotWithOutliers.ts';
import { boxPlotWithOutliersFromSorted } from './xBoxPlotWithOutliers.ts';
import { xCheck } from './xCheck.ts';
import { xMean } from './xMean.ts';
import { xStandardDeviation } from './xStandardDeviation.ts';

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
 * @param array - data.
 * @returns q1, median, q3, min, max.
 */
export function xRobustDistributionStats(
  array: NumberArray,
): XRobustDistributionStats {
  xCheck(array);
  const sorted = getSortedFloat64(array);

  const boxPlot = boxPlotWithOutliersFromSorted(sorted);

  if (boxPlot.max - boxPlot.min <= Number.EPSILON) {
    return {
      ...boxPlot,
      mean: boxPlot.median,
      sd: sorted.length === 1 ? Number.NaN : 0,
      nb: sorted.length,
    };
  }

  // non-outliers form a contiguous range in the sorted array, so we slice it
  // as a zero-copy view instead of allocating and filling a filtered array.
  let lowIndex = 0;
  while (lowIndex < sorted.length && sorted[lowIndex] < boxPlot.lowerWhisker) {
    lowIndex++;
  }
  let highIndex = sorted.length;
  while (highIndex > lowIndex && sorted[highIndex - 1] > boxPlot.upperWhisker) {
    highIndex--;
  }
  const filteredArray = sorted.subarray(lowIndex, highIndex);

  const mean = xMean(filteredArray);
  return {
    ...boxPlot,
    mean,
    sd: xStandardDeviation(filteredArray, { mean }),
    nb: filteredArray.length,
  };
}
