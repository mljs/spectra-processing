import { DoubleArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';

import { xMaxValue } from './xMaxValue';
import { xMinValue } from './xMinValue';

/** Function used to rescale data
 *
 * @param input - input for the rescale
 * @param options - options
 * @returns rescaled data
 */

export function xRescale(
  input: DoubleArray | Uint16Array,
  options: {
    /** output into which to placed the data */
    output?: DoubleArray | Uint16Array;
    /** min used for the scaling */
    min?: number;
    /** max used for the scaling */
    max?: number;
    /** option to find min and max automatically */
    autoMinMax?: boolean;
  } = {},
) {
  let output;
  if (options.output !== undefined) {
    if (!isAnyArray(options.output)) {
      throw new TypeError('output option must be an array if specified');
    }
    output = options.output;
  } else {
    output = new Array(input.length);
  }

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
