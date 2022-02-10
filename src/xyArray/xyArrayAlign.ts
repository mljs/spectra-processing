import { DoubleArray, DataXY } from 'cheminfo-types';

import { xyJoinX } from '../xy/xyJoinX';

import { getSlots } from './utils/getSlots';

/**
 * Aligns data, can be used for spectra
 *
 * @param data - data
 * @param options - Options
 */
export function xyArrayAlign(
  data: DataXY[],
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
  const { delta = 1 } = options;

  data = data.map((spectrum) => xyJoinX(spectrum, { delta }));

  const slots = getSlots(data, options);
  let x = Float64Array.from(slots.map((slot) => slot.average));
  let ys = new Array(data.length).fill(0).map(() => new Float64Array(x.length));

  let positions = new Uint32Array(data.length);
  for (let i = 0; i < slots.length; i++) {
    let slot = slots[i];
    for (let j = 0; j < data.length; j++) {
      let spectrum = data[j];
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
