import { NumberArray } from 'cheminfo-types';

import { xCheck } from '..';

import { getOutputArray } from './utils/getOutputArray';
import { xMaxValue } from './xMaxValue';
import { xMinValue } from './xMinValue';

/** Function used to rescale data
 *
 * @param input - input for the rescale
 * @param options - options
 * @returns rescaled data
 */

export function xRescale<T extends NumberArray = Float64Array>(
  input: NumberArray,
  options: {
    /** output into which to placed the data */
    output?: T;
    /** min used for the scaling */
    min?: number;
    /** max used for the scaling */
    max?: number;
    /** option to find min and max automatically */
    autoMinMax?: boolean;
  } = {},
): T {
  xCheck(input);
  const output = getOutputArray(options.output, input.length);

  const currentMin = xMinValue(input);
  const currentMax = xMaxValue(input);

  if (currentMin === currentMax) {
    throw new RangeError(
      'minimum and maximum input values are equal. Cannot rescale a constant array',
    );
  }

  const {
    min: minValue = options.autoMinMax ? currentMin : 0,
    max: maxValue = options.autoMinMax ? currentMax : 1,
  } = options;

  if (minValue >= maxValue) {
    throw new RangeError('min option must be smaller than max option');
  }

  const factor = (maxValue - minValue) / (currentMax - currentMin);
  for (let i = 0; i < input.length; i++) {
    output[i] = (input[i] - currentMin) * factor + minValue;
  }

  return output;
}
