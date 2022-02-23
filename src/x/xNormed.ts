import { NumberArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';

import { xMaxValue } from './xMaxValue';
import { xSum } from './xSum';

/** Divides the data with either the sum, the absolute sum or the maximum of the data
 *
 * @param array - Array containing values
 * @param options - options
 * @returns - normalized data
 */

export function xNormed(
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
    output?: NumberArray;
  } = {},
) {
  const { algorithm = 'absolute', sumValue = 1, maxValue = 1 } = options;
  if (!isAnyArray(input)) {
    throw new Error('input must be an array');
  }

  let output;
  if (options.output !== undefined) {
    if (!isAnyArray(options.output)) {
      throw new TypeError('output option must be an array if specified');
    }
    output = options.output;
  } else {
    output = new Float64Array(input.length);
  }

  if (input.length === 0) {
    throw new Error('input must not be empty');
  }

  switch (algorithm.toLowerCase()) {
    case 'absolute': {
      let absoluteSumValue = absoluteSum(input) / sumValue;
      if (absoluteSumValue === 0) return input.slice(0);
      for (let i = 0; i < input.length; i++) {
        output[i] = input[i] / absoluteSumValue;
      }
      return output;
    }
    case 'max': {
      let currentMaxValue = xMaxValue(input);
      if (currentMaxValue === 0) return input.slice(0);
      const factor = maxValue / currentMaxValue;
      for (let i = 0; i < input.length; i++) {
        output[i] = input[i] * factor;
      }
      return output;
    }
    case 'sum': {
      let sumFactor = xSum(input) / sumValue;
      if (sumFactor === 0) return input.slice(0);
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
