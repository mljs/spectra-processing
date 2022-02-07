import { DataXY } from 'cheminfo-types';

import { xyJoinX } from '../xy/xyJoinX';

import { getSlots } from './utils/getSlots';
/**
 * Merge DataXY
 * We have an array of DataXY and the goal is to merge all the values that are the closest possible
 *
 * @param data - data
 * @param options - Options
 */
export function xyArrayMerge(
  data: DataXY[],
  options: {
    /**
     * The range in which the two x values of the data/spectra must be to be placed on the same line. It may also be a function that allows to change `delta` depending on the X values of the spectrum
     * @default 1
     */
    delta?: ((arg: number) => number) | number;
  } = {},
): DataXY {
  const { delta = 1 } = options;
  // we start by checking that the data/spectra don't have peaks too close and we simplify them
  data = data.map((spectrum) => xyJoinX(spectrum, { delta }));

  // at first we will calculate the X values (simple mean)
  let slots = getSlots(data, options);

  let x = Float64Array.from(slots.map((slot) => slot.average));
  let y = new Float64Array(x.length);

  let positions = new Uint32Array(data.length);
  for (let i = 0; i < slots.length; i++) {
    let slot = slots[i];
    for (let j = 0; j < data.length; j++) {
      let spectrum = data[j];
      while (
        positions[j] < spectrum.x.length &&
        spectrum.x[positions[j]] <= slot.to
      ) {
        y[i] += spectrum.y[positions[j]];
        positions[j]++;
      }
    }
  }

  return { x, y };
}
