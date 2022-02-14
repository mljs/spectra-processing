import { NumberArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';

import { xMean } from './xMean';

/** Finds the variance of the data
 *
 * @param values - the values of the array
 * @param options - options
 * @returns variance
 */
export function xVariance(
  values: NumberArray,
  options: {
    /** Unbiased option
     * @default true
     */
    unbiased?: boolean;
    /** Mean of the data
     * @default mean calculated
     */
    mean?: number;
  } = {},
) {
  if (!isAnyArray(values)) {
    throw new TypeError('input must be an array');
  }

  const { unbiased = true, mean = xMean(values) } = options;
  let sqrError = 0;

  for (let i = 0; i < values.length; i++) {
    let x = values[i] - mean;
    sqrError += x * x;
  }

  if (unbiased) {
    return sqrError / (values.length - 1);
  } else {
    return sqrError / values.length;
  }
}
