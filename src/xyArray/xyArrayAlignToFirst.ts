import { DoubleArray, DataXY } from 'cheminfo-types';

import { getSlotsToFirst } from './utils/getSlotsToFirst';

/**
 * We align all the data/spectra to the first array of X.
 * The alignment is based on the X values of the first spectrum and the `delta` error allowed. If some x values are missing in the first specdtrum we will add them
 *
 * @param data data
 * @param options options
 */
export function xyArrayAlignToFirst(
  data: Array<DataXY>,
  options: {
    /**
     * The range in which the two x values of the data/spectra must be to be placed on the same line. It may also be a function that allows to change `delta` depending on the X values of the spectrum
     * @default 1
     */
    delta?: ((arg: number) => number) | number;
  } = {},
): {
  x: DoubleArray;
  ys: DoubleArray[];
} {
  const slots = getSlotsToFirst(data, options);
  let x = Float64Array.from(slots.map((slot) => slot.value));
  let ys = new Array(data.length).fill(0).map(() => new Float64Array(x.length));

  let positions = new Uint32Array(data.length);
  for (let i = 0; i < slots.length; i++) {
    let slot = slots[i];
    for (let j = 0; j < data.length; j++) {
      let spectrum = data[j];
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
