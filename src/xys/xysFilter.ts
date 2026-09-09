import type { DataXYs } from 'cheminfo-types';

export interface XYsFilterOptions {
  /**
   * The minimal y a spectrum must have in a slot to contain it, meant to be set
   * above 0. When it is not set a spectrum contains a slot when its y there is
   * not 0, so the negative peaks of a signed spectrum count as present.
   * On its own this never removes a slot, it only changes what the criteria below
   * count as contained.
   * @default undefined
   */
  minY?: number;

  /**
   * The smallest number of spectra that must contain a slot. 0 does not filter.
   * @default 0
   */
  minNumberOfSpectra?: number;

  /**
   * The smallest number of neighbouring spectra that must all contain a slot,
   * neighbouring meaning next to each other in `ys`. Made for spectra ordered by
   * retention time, where a real compound is present in a run of consecutive
   * scans while noise is scattered. 0 does not filter.
   * @default 0
   */
  minConsecutiveSpectra?: number;

  /**
   * If true, every spectrum must contain the slot. Same as setting
   * `minNumberOfSpectra` to the number of spectra.
   * @default false
   */
  requiredY?: boolean;
}

/**
 * Removes the slots of an aligned set of spectra that too few spectra contain.
 *
 * `requiredY`, `minNumberOfSpectra` and `minConsecutiveSpectra` are the criteria,
 * and `minY` only says what they count as contained. They may be combined, a slot
 * is kept only when it passes all the ones that are set, so with no criterion set
 * nothing is removed. They only ever remove slots, the y values are never changed.
 * @param data - aligned spectra, as returned by the align methods.
 * @param options - options.
 * @returns the same spectra with the rejected slots removed.
 */
export function xysFilter(
  data: DataXYs,
  options: XYsFilterOptions = {},
): DataXYs<Float64Array> {
  const {
    minY,
    minNumberOfSpectra = 0,
    minConsecutiveSpectra = 0,
    requiredY = false,
  } = options;

  const { x, ys } = data;
  const length = x.length;
  const numberOfSpectra = ys.length;
  const minNumber = requiredY ? numberOfSpectra : minNumberOfSpectra;
  const hasMinY = minY !== undefined;
  const threshold = minY ?? 0;

  const numbers = new Uint32Array(length);
  let longestRuns: Uint32Array | undefined;
  if (minConsecutiveSpectra > 0) {
    longestRuns = new Uint32Array(length);
    const runs = new Uint32Array(length);
    for (let j = 0; j < numberOfSpectra; j++) {
      const y = ys[j];
      for (let i = 0; i < length; i++) {
        if (hasMinY ? y[i] > threshold : y[i] !== 0) {
          numbers[i]++;
          const run = runs[i] + 1;
          runs[i] = run;
          if (run > longestRuns[i]) longestRuns[i] = run;
        } else {
          runs[i] = 0;
        }
      }
    }
  } else if (minNumber > 0) {
    for (let j = 0; j < numberOfSpectra; j++) {
      const y = ys[j];
      for (let i = 0; i < length; i++) {
        if (hasMinY ? y[i] > threshold : y[i] !== 0) numbers[i]++;
      }
    }
  }

  let kept = 0;
  for (let i = 0; i < length; i++) {
    if (numbers[i] < minNumber) continue;
    if (longestRuns && longestRuns[i] < minConsecutiveSpectra) continue;
    kept++;
  }

  const newX = new Float64Array(kept);
  const positions = new Uint32Array(kept);
  let at = 0;
  for (let i = 0; i < length; i++) {
    if (numbers[i] < minNumber) continue;
    if (longestRuns && longestRuns[i] < minConsecutiveSpectra) continue;
    newX[at] = x[i];
    positions[at] = i;
    at++;
  }

  const newYs = Array.from(ys, (y) => {
    const newY = new Float64Array(kept);
    for (let i = 0; i < kept; i++) {
      newY[i] = y[positions[i]];
    }
    return newY;
  });

  return { x: newX, ys: newYs };
}
