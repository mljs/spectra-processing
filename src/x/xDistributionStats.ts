import type { NumberArray } from 'cheminfo-types';

import type { XBoxPlotWithOutliers } from './xBoxPlotWithOutliers';
import { xBoxPlotWithOutliers } from './xBoxPlotWithOutliers';
import { xMean } from './xMean';
import { xStandardDeviation } from './xStandardDeviation';

export interface XDistributionStats extends XBoxPlotWithOutliers {
  mean: number;
  sd: number;
  nb: number;
}

/**
 * Calculate distribution statistics of an array without providing options
 * This ensure that the statistics are calculated in the same way in all the packages
 * If the array is empty it will throw an error
 * If the array has a length of 1, sd will be NaN (unbiased calculation of sd)
 * @param array - data
 * @param options
 * @returns - q1, median, q3, min, max
 */
export function xDistributionStats(array: NumberArray): XDistributionStats {
  return {
    ...xBoxPlotWithOutliers(array),
    mean: xMean(array),
    sd: xStandardDeviation(array),
    nb: array.length,
  };
}
