import type { NumberArray } from 'cheminfo-types';

import { getSortedFloat64 } from './getSortedFloat64.ts';
import type { XBoxPlotWithOutliers } from './xBoxPlotWithOutliers.ts';
import { boxPlotWithOutliersAndBounds } from './xBoxPlotWithOutliers.ts';
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

  const { boxPlot, bounds } = boxPlotWithOutliersAndBounds(sorted);

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
  const filteredArray = sorted.subarray(bounds.lowIndex, bounds.highIndex);

  const mean = xMean(filteredArray);
  return {
    ...boxPlot,
    mean,
    sd: xStandardDeviation(filteredArray, { mean }),
    nb: filteredArray.length,
  };
}
