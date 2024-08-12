import { NumberArray } from 'cheminfo-types';

import { xVariance, XVarianceOptions } from './xVariance';

/**
 * Finds the standard deviation for the data at hand
 * @param values - values in the data
 * @param options - options
 * @returns standard deviation
 */
export function xStandardDeviation(
  values: NumberArray,
  options: XVarianceOptions = {},
): number {
  return Math.sqrt(xVariance(values, options));
}
