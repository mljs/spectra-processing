import { NumberArray } from 'cheminfo-types';

import { getOutputArray } from './utils/getOutputArray';
import { xCheck } from './xCheck';
import { xMaxValue } from './xMaxValue';
import { xSum } from './xSum';

/**
 * Divides the data with either the sum, the absolute sum or the maximum of the data
 * @param array - Array containing values
 * @param options - options
 * @returns - normalized data
 */

export function xNormed<T extends NumberArray = Float64Array>(
  input: NumberArray,
  options: {
    /** value by which to divide the data
     * @default 'absolute'
     */
    algorithm?: string;
    /** sum value
     * @default 1
     */
    sumValue?: number;
    /** max value
     * @default 1
     */
    maxValue?: number;
    /** output into which the result should be placed if needed */
    output?: T;
  } = {},
): T {
  const { algorithm = 'absolute', sumValue = 1, maxValue = 1 } = options;
  xCheck(input);

  const output = getOutputArray(options.output, input.length);

  if (input.length === 0) {
    throw new Error('input must not be empty');
  }

  switch (algorithm.toLowerCase()) {
    case 'absolute': {
      let absoluteSumValue = absoluteSum(input) / sumValue;
      if (absoluteSumValue === 0) {
        throw new Error('xNormed: trying to divide by 0');
      }
      for (let i = 0; i < input.length; i++) {
        output[i] = input[i] / absoluteSumValue;
      }
      return output;
    }
    case 'max': {
      let currentMaxValue = xMaxValue(input);
      if (currentMaxValue === 0) {
        throw new Error('xNormed: trying to divide by 0');
      }
      const factor = maxValue / currentMaxValue;
      for (let i = 0; i < input.length; i++) {
        output[i] = input[i] * factor;
      }
      return output;
    }
    case 'sum': {
      let sumFactor = xSum(input) / sumValue;
      if (sumFactor === 0) {
        throw new Error('xNormed: trying to divide by 0');
      }
      for (let i = 0; i < input.length; i++) {
        output[i] = input[i] / sumFactor;
      }
      return output;
    }
    default:
      throw new Error(`norm: unknown algorithm: ${algorithm}`);
  }
}

function absoluteSum(input: NumberArray) {
  let sumValue = 0;
  for (let i = 0; i < input.length; i++) {
    sumValue += Math.abs(input[i]);
  }
  return sumValue;
}
