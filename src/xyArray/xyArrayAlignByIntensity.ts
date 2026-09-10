import type { DataXY, DataXYs } from 'cheminfo-types';

import { getIntensitySlots } from './utils/getIntensitySlots.ts';
import { mergeSortedXY } from './utils/mergeSortedXY.ts';

export interface XYArrayAlignByIntensityOptions {
  /**
   * A peak joins a slot when its x is within `delta` of the x of the most intense
   * peak of that slot, so a slot is never wider than `2 * delta`. It may also be a
   * function that allows to change `delta` depending on the x value.
   * @default 1
   */
  delta?: ((arg: number) => number) | number;
}

/**
 * Aligns spectra on the most intense peaks, which is meant for centroided data
 * whose x values drift slightly from one spectrum to the next.
 *
 * The most intense peak of the whole set defines the first common x, and takes
 * every peak within `delta` of it. The most intense of the remaining peaks defines
 * the next one, and so on until every peak has been placed. The reported x of a
 * slot is the intensity weighted average of the peaks it holds, and its y is their
 * sum, so no intensity is created or lost. Because a slot only ever reaches
 * `delta` away from the peak that opened it, dense data cannot chain into a single
 * wide slot the way `xyArrayAlign` does.
 *
 * The x values of each spectrum must be ascending.
 *
 * The result is a dense matrix: it holds `data.length * x.length` numbers, which
 * is out of reach for tens of thousands of spectra. Use
 * `xyArrayMergeByIntensity` to get the common peaks alone, and `xysFilter` to
 * drop the slots too few spectra contain.
 * @param data - data
 * @param options - options.
 * @returns the common `x` axis and one aligned `y` array per input spectrum.
 */
export function xyArrayAlignByIntensity(
  data: DataXY[],
  options: XYArrayAlignByIntensityOptions = {},
): DataXYs<Float64Array> {
  const { delta = 1 } = options;

  const merged = mergeSortedXY(data);
  const slots = getIntensitySlots(merged, { delta });

  const x = slots.x;
  const ys = Array.from(data, () => new Float64Array(x.length));
  const { slotIndex } = slots;
  const { spectrumIndex, y: mergedY } = merged;
  for (let i = 0; i < slotIndex.length; i++) {
    ys[spectrumIndex[i]][slotIndex[i]] += mergedY[i];
  }

  return { x, ys };
}
