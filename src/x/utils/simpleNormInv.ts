import type { NumberArray } from 'cheminfo-types';

import erfcinv from './erfcinv';

interface SimpleNormInvOptions {
  /**
   * If true the returns values will be calculated from the Rayleigh inverse cumulative distribution.
   * it returns
   * @default false
   */
  magnitudeMode?: boolean;
}

/**
 * Applies a simple normalization inverse transformation to the input data.
 * @param data - The input array of numbers to be transformed.
 * @param options - Optional parameters for the transformation.
 * @returns A new Float64Array containing the transformed data.
 */
export function simpleNormInv(
  data: NumberArray,
  options: SimpleNormInvOptions = {},
): Float64Array {
  const { magnitudeMode = false } = options;

  const result = new Float64Array(data.length);
  if (magnitudeMode) {
    for (let i = 0; i < result.length; i++) {
      result[i] = -Math.sqrt(-2 * Math.log(1 - data[i]));
    }
  } else {
    for (let i = 0; i < result.length; i++) {
      result[i] = -1 * Math.SQRT2 * erfcinv(2 * data[i]);
    }
  }
  return result;
}

/**
 * Convenience wrapper for single number processing by simpleNormInv function.
 * @param data - The number to be normalized.
 * @param options - The options for the normalization process.
 * @returns The normalized number.
 */
export function simpleNormInvNumber(
  data: number,
  options: SimpleNormInvOptions = {},
): number {
  return simpleNormInv([data], options)[0];
}
