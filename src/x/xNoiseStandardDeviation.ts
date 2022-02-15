import { DoubleArray } from 'cheminfo-types';

import { xMedianAbsoluteDeviation } from '..';

/**
 * Determine noise level using MAD https://en.wikipedia.org/wiki/Median_absolute_deviation
 * Constant to convert mad to sd calculated using https://www.wolframalpha.com/input?i=sqrt%282%29+inverse+erf%280.5%29
 * This assumes a gaussian distribution of the noise
 * @param array
 * @returns noise level corresponding to one standard deviation
 */

export function xNoiseStandardDeviation(array: DoubleArray): {
  /**
   * Median of the data
   */
  median: number;
  /**
   * Median absolute devication
   */
  mad: number;
  /**
   * standard deviation of the noise
   */
  sd: number;
} {
  const { mad, median } = xMedianAbsoluteDeviation(array);
  return { sd: mad / 0.6744897501960817, mad, median };
}
