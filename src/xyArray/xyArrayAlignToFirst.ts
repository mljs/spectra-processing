import { NumberArray, DataXY } from 'cheminfo-types';

import { getSlotsToFirst } from './utils/getSlotsToFirst';

export interface XYArrayAlignToFirstOptions {
  /**
   * The range in which the two x values of the data/spectra must be to be placed on the same line. It may also be a function that allows to change `delta` depending on the X values of the spectrum
   * @default 1
   */
  delta?: ((arg: number) => number) | number;
}

/**
 * We align all the data/spectra to the first array of X.
 * The alignment is based on the X values of the first spectrum and the `delta` error allowed.
 * If some x values are missing in the first spectrum we will add them
 * @param data - data
 * @param options - options
 */
export function xyArrayAlignToFirst(
  data: DataXY[],
  options: XYArrayAlignToFirstOptions = {},
): {
  x: NumberArray;
  ys: NumberArray[];
} {
  const { delta = 1 } = options;
  const slots = getSlotsToFirst(data, { delta });
  const x = Float64Array.from(slots.map((slot) => slot.value));
  const ys = Array.from(data, () => new Float64Array(x.length));

  const positions = new Uint32Array(data.length);
  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    for (let j = 0; j < data.length; j++) {
      const spectrum = data[j];
      while (
        positions[j] < spectrum.x.length &&
        spectrum.x[positions[j]] < slot.to
      ) {
        ys[j][i] += spectrum.y[positions[j]];
        positions[j]++;
      }
    }
  }

  return { x, ys };
}
