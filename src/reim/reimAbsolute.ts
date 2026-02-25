import type { DoubleArray } from 'cheminfo-types';

import type { DataReIm } from '../types/index.ts';

/**
 * Calculates reimAbsolute value of a complex spectrum.
 * @param data - complex spectrum
 * @param options
 * @param options.output
 * @returns - reimAbsolute value
 */
export function reimAbsolute(
  data: DataReIm,
  options: { output?: DoubleArray } = {},
): DoubleArray {
  const length = data.re.length;
  const { output = new Float64Array(length) } = options;
  const re = data.re;
  const im = data.im;
  for (let i = 0; i < length; i++) {
    output[i] = Math.hypot(re[i], im[i]);
  }

  return output;
}
