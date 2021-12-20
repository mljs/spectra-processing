import { DoubleArray, DataXY } from 'cheminfo-types';

import { getSlotsToFirst } from './utils/getSlotsToFirst';

/**
 * We align all the spectra to the first array of X.
 * The alignment is based on the X values of the first spectrum and the `delta` error allowed. If some x values are missing in the first specdtrum we will add them
 *
 * @param spectra spectra
 * @param options options
 */
export function xyArrayAlignToFirst(
  spectra: Array<DataXY>,
  options: {
    /**
     * The range in which the two x values of the spectra must be to be placed on the same line. It may also be a function that allows to change `delta` depending on the X values of the spectrum
     * @default 1
     */
    delta?: ((arg: number) => number) | number;
  } = {},
): {
  x: DoubleArray;
  ys: DoubleArray[];
} {
  const slots = getSlotsToFirst(spectra, options);
  let x = Float64Array.from(slots.map((slot) => slot.value));
  let ys = new Array(spectra.length)
    .fill(0)
    .map(() => new Float64Array(x.length));

  let positions = new Uint32Array(spectra.length);
  for (let i = 0; i < slots.length; i++) {
    let slot = slots[i];
    for (let j = 0; j < spectra.length; j++) {
      let spectrum = spectra[j];
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
