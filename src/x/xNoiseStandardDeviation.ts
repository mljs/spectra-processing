import { NumberArray } from 'cheminfo-types';

import { xMedianAbsoluteDeviation } from './xMedianAbsoluteDeviation';

export interface XNoiseStandardDeviationResult {
  /**
   * Median of the data
   */
  median: number;

  /**
   * Median absolute deviation
   */
  mad: number;

  /**
   * standard deviation of the noise
   */
  sd: number;
}

/**
 * Determine noise level using MAD https://en.wikipedia.org/wiki/Median_absolute_deviation
 * Constant to convert mad to sd calculated using https://www.wolframalpha.com/input?i=sqrt%282%29+inverse+erf%280.5%29
 * This assumes a gaussian distribution of the noise
 * @param array
 * @returns noise level corresponding to one standard deviation
 */
export function xNoiseStandardDeviation(
  array: NumberArray,
): XNoiseStandardDeviationResult {
  const { mad, median } = xMedianAbsoluteDeviation(array);
  return { sd: mad / 0.6744897501960817, mad, median };
}
