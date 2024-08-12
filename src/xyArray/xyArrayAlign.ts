import { DataXY, NumberArray } from 'cheminfo-types';

import { xyJoinX } from '../xy';

import { getSlots } from './utils/getSlots';

export interface XYArrayAlignOptions {
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
}

/**
 * Aligns data, can be used for spectra
 * @param data - data
 * @param options - Options
 */
export function xyArrayAlign(
  data: DataXY[],
  options: XYArrayAlignOptions = {},
): {
  x: NumberArray;
  ys: NumberArray[];
} {
  const { delta = 1, requiredY = false } = options;

  data = data.map((spectrum) => xyJoinX(spectrum, { delta }));

  const slots = getSlots(data, { delta });
  const x = Float64Array.from(slots.map((slot) => slot.average));
  const ys = Array.from(data, () => new Float64Array(x.length));

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

function filterRequiredY(x: Float64Array, ys: Float64Array[]) {
  const newX: number[] = [];
  const newYs: number[][] = Array.from(ys, () => []);
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
