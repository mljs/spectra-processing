import { DoubleMatrix } from '../types';
import { xNoiseStandardDeviation } from '../x';

import { matrixToArray } from './matrixToArray';

/**
 * Determine noise level using MAD https://en.wikipedia.org/wiki/Median_absolute_deviation
 * Constant to convert mad to sd calculated using https://www.wolframalpha.com/input?i=sqrt%282%29+inverse+erf%280.5%29
 * This assumes a gaussian distribution of the noise.
 * @param matrix
 * @returns Noise level corresponding to one standard deviation.
 */
export function matrixNoiseStandardDeviation(matrix: DoubleMatrix) {
  return xNoiseStandardDeviation(matrixToArray(matrix));
}
