import type { DataXY } from 'cheminfo-types';

import type { IntensitySlots } from './utils/getIntensitySlots.ts';
import { getIntensitySlots } from './utils/getIntensitySlots.ts';
import { mergeSortedXY } from './utils/mergeSortedXY.ts';

export interface XYArrayMergeByIntensityOptions {
  /**
   * A peak joins a slot when its x is within `delta` of the x of the most intense
   * peak of that slot, so a slot is never wider than `2 * delta`. It may also be a
   * function that allows to change `delta` depending on the x value.
   * @default 1
   */
  delta?: ((arg: number) => number) | number;
}

/**
 * The merged peaks: every field of a slot except which slot each input point landed in.
 */
export type XYArrayMergeByIntensityResult = Omit<IntensitySlots, 'slotIndex'>;

/**
 * Merges the peaks of many spectra around the most intense ones.
 *
 * This is `xyArrayAlignByIntensity` without the per spectrum y arrays: the
 * most intense peak of the whole set takes every peak within `delta` of it, the
 * most intense of the remaining peaks opens the next slot, and so on. Every peak
 * ends up in exactly one slot, so the sum of `y` is the sum of the intensities of
 * all the spectra.
 *
 * The x values of each spectrum must be ascending. Only the merged peaks are held
 * in memory, so it scales to tens of millions of peaks where a dense alignment
 * matrix does not.
 * @param data - data
 * @param options - options.
 * @returns the common peaks, ascending by x.
 */
export function xyArrayMergeByIntensity(
  data: DataXY[],
  options: XYArrayMergeByIntensityOptions = {},
): XYArrayMergeByIntensityResult {
  const { delta = 1 } = options;

  const { x, y, from, to, number } = getIntensitySlots(mergeSortedXY(data), {
    delta,
  });

  return { x, y, from, to, number };
}
