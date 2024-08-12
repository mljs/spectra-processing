import { NumberArray } from 'cheminfo-types';

import { getOutputArray } from './getOutputArray';
import { xCheck } from './xCheck';
import { xMaxValue } from './xMaxValue';
import { xSum } from './xSum';

export interface XNormedOptions<ArrayType extends NumberArray = Float64Array> {
  /**
   * algorithm can be 'sum' 'max' or 'absolute'
   * @default 'absolute'
   */
  algorithm?: 'absolute' | 'max' | 'sum';

  /**
   * max or sum value
   * @default 1
   */
  value?: number;

  /** output into which the result should be placed if needed */
  output?: ArrayType;
}

/**
 * Divides the data with either the sum, the absolute sum or the maximum of the data
 * @param input - Array containing values
 * @param options - options
 * @returns - normalized data
 */
export function xNormed<ArrayType extends NumberArray = Float64Array>(
  input: NumberArray,
  options: XNormedOptions<ArrayType> = {},
): ArrayType {
  const { algorithm = 'absolute', value = 1 } = options;
  xCheck(input);

  const output = getOutputArray(options.output, input.length);

  if (input.length === 0) {
    throw new Error('input must not be empty');
  }

  switch (algorithm) {
    case 'absolute': {
      const absoluteSumValue = absoluteSum(input) / value;
      if (absoluteSumValue === 0) {
        throw new Error('trying to divide by 0');
      }
      for (let i = 0; i < input.length; i++) {
        output[i] = input[i] / absoluteSumValue;
      }
      return output;
    }
    case 'max': {
      const currentMaxValue = xMaxValue(input);
      if (currentMaxValue === 0) {
        throw new Error('trying to divide by 0');
      }
      const factor = value / currentMaxValue;
      for (let i = 0; i < input.length; i++) {
        output[i] = input[i] * factor;
      }
      return output;
    }
    case 'sum': {
      const sumFactor = xSum(input) / value;
      if (sumFactor === 0) {
        throw new Error('trying to divide by 0');
      }
      for (let i = 0; i < input.length; i++) {
        output[i] = input[i] / sumFactor;
      }
      return output;
    }
    default:
      throw new Error(`unknown algorithm: ${String(algorithm)}`);
  }
}

function absoluteSum(input: NumberArray) {
  let sumValue = 0;
  for (let i = 0; i < input.length; i++) {
    sumValue += Math.abs(input[i]);
  }
  return sumValue;
}
