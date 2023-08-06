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
    /**
     * If true, the y values must be present everywhere
     * @default false
     */
    requiredY?: boolean;
  } = {},
): {
  x: DoubleArray;
  ys: DoubleArray[];
} {
  const { delta = 1, requiredY = false } = options;

  data = data.map((spectrum) => xyJoinX(spectrum, { delta }));

  const slots = getSlots(data, options);
  const x = Float64Array.from(slots.map((slot) => slot.average));
  const ys = new Array(data.length)
    .fill(0)
    .map(() => new Float64Array(x.length));

  const positions = new Uint32Array(data.length);
  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    for (let j = 0; j < data.length; j++) {
      const spectrum = data[j];
      while (
        positions[j] < spectrum.x.length &&
        spectrum.x[positions[j]] <= slot.to
      ) {
        ys[j][i] += spectrum.y[positions[j]];
        positions[j]++;
      }
    }
  }

  if (requiredY) return filterRequiredY(x, ys);

  return { x, ys };
}

function filterRequiredY(x: DoubleArray, ys: DoubleArray[]) {
  const newX = [];
  const newYs: number[][] = new Array(ys.length).fill(0).map(() => []);
  for (let i = 0; i < x.length; i++) {
    if (ys.every((y) => y[i] !== 0)) {
      newX.push(x[i]);
      for (let j = 0; j < ys.length; j++) {
        newYs[j].push(ys[j][i]);
      }
    }
  }
  return { x: newX, ys: newYs };
}
