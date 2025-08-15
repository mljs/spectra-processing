import type { NumberArray } from 'cheminfo-types';

import type { XVarianceOptions } from './xVariance.ts';
import { xVariance } from './xVariance.ts';

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
