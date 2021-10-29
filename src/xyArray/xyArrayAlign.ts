import { Data } from '..';
import { xyJoinX } from '../xy/xyJoinX';

import { getSlots } from './utils/getSlots';

/**
 * Aligns spectra
 *
 * @param {Array<Data>} spectra spectra
 * @param {object} [options={}] Options
 * @param {number | Function} [options.delta=1] The range in which the two x values of the spectra must be to be placed on the same line. It may also be a function that allows to change `delta` depending on the X values of the spectrum
 * @returns {{x:number[], ys:number[][]}} {x:[], ys:[[]]}
 */
export function xyArrayAlign(
  spectra: Data[],
  options: { delta?: ((arg: number) => number) | number } = {},
): {
  x: number[] | Float64Array | Float32Array | Uint16Array;
  ys: number[][] | Float64Array[] | Float32Array[] | Uint16Array[];
} {
  const { delta = 1 } = options;

  // we start by checking that the spectra don't have peaks too close and we simplify them
  spectra = spectra.map((spectrum) => xyJoinX(spectrum, { delta }));

  const slots = getSlots(spectra, options);
  let x = Float64Array.from(slots.map((slot) => slot.average));
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
        spectrum.x[positions[j]] <= slot.to
      ) {
        ys[j][i] += spectrum.y[positions[j]];
        positions[j]++;
      }
    }
  }

  return { x, ys };
}