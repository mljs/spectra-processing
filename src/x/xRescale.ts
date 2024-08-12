import { NumberArray } from 'cheminfo-types';

import { getOutputArray } from './getOutputArray';
import { xCheck } from './xCheck';
import { xMaxValue } from './xMaxValue';
import { xMinValue } from './xMinValue';

export interface XRescaleOptions<ArrayType extends NumberArray = Float64Array> {
  /** output into which to placed the data */
  output?: ArrayType;

  /**
   * min used for the scaling
   * @default 0
   */
  min?: number;

  /**
   * max used for the scaling
   * @default 1
   */
  max?: number;
}

/**
 * Function used to rescale data
 * @param input - input for the rescale
 * @param options - options
 * @returns rescaled data
 */
export function xRescale<ArrayType extends NumberArray = Float64Array>(
  input: NumberArray,
  options: XRescaleOptions<ArrayType> = {},
): ArrayType {
  xCheck(input);
  const output = getOutputArray(options.output, input.length);

  const currentMin = xMinValue(input);
  const currentMax = xMaxValue(input);

  if (currentMin === currentMax) {
    throw new RangeError(
      'minimum and maximum input values are equal. Cannot rescale a constant array',
    );
  }

  const { min = 0, max = 1 } = options;

  if (min >= max) {
    throw new RangeError('min option must be smaller than max option');
  }

  const factor = (max - min) / (currentMax - currentMin);
  for (let i = 0; i < input.length; i++) {
    output[i] = (input[i] - currentMin) * factor + min;
  }

  return output;
}
