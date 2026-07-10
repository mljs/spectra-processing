import type { DoubleArray, NumberArray } from 'cheminfo-types';

import { xBinning } from '../xBinning.ts';
import { xFindClosestIndex } from '../xFindClosestIndex.ts';
import type { XWhittakerSmootherOptions } from '../xWhittakerSmoother.ts';

export interface DownsampleOptions extends XWhittakerSmootherOptions {
  /**
   * Enable automatic downsampling for large datasets to speed up computation.
   * @default true
   */
  autoDownsample?: boolean;
  /**
   * Maximum number of points allowed before downsampling is applied. Only
   * considered when `autoDownsample` is true.
   * @default 5000
   */
  maxResolution?: number;
  /**
   * Optional array of 0|1 values on the original axis to force the baseline to
   * cross those points. When downsampling is applied this will be remapped to
   * the downsampled axis (returned inside `optionsWork`).
   */
  controlPoints?: NumberArray;
}

/**
 * Compute downsampled data and remap options (including controlPoints) to the
 * downsampled axis when auto-downsampling is enabled and the input exceeds the
 * requested resolution.
 *
 * Returns an object containing:
 * - `xWork`: the (possibly) downsampled x axis
 * - `yWork`: the (possibly) downsampled y axis
 * - `optionsWork`: the options to use with the downsampled data (controlPoints
 *    remapped to the new axis when present)
 * - `shouldDownsample`: boolean indicating whether downsampling was applied
 *
 * The function uses `xBinning` with `keepFirstAndLast: true` and remaps
 * `controlPoints` (if provided) by finding the closest index in the downsampled
 * `xWork` for each original control point.
 * @param x - Original x axis values.
 * @param y - Original y values.
 * @param options - Downsampling options. Supported fields: `autoDownsample`,
 * `maxResolution`, and `controlPoints`.
 * @returns An object with the following properties:
 * - `xWork`: `DoubleArray` — the downsampled (or original) x axis.
 * - `yWork`: `DoubleArray` — the downsampled (or original) y values.
 * - `optionsWork`: `object` — the options adjusted for the downsampled data
 *    (including `controlPoints` remapped when applicable).
 * - `shouldDownsample`: `boolean` — true if downsampling was applied.
 */
export function getDownSampleData(
  x: DoubleArray,
  y: DoubleArray,
  options: DownsampleOptions = {},
) {
  const {
    autoDownsample = false,
    maxResolution = 5000,
    controlPoints,
  } = options;

  const shouldDownsample = autoDownsample && y.length > maxResolution;

  if (!shouldDownsample) {
    return { xWork: x, yWork: y, optionsWork: options, shouldDownsample };
  }

  const binSize = getDownsampleFactor(y.length, maxResolution);
  const xWork = xBinning(x, {
    binSize,
    keepFirstAndLast: true,
  });
  const yWork = xBinning(y, {
    binSize,
    keepFirstAndLast: true,
  });

  let optionsWork = options;

  // Downsample controlPoints if provided, to match downsampled x and y
  if (controlPoints) {
    const downsampledControlPoints = new Int8Array(xWork.length);
    for (let i = 0; i < x.length; i++) {
      if (controlPoints[i] > 0) {
        const closestIndex = xFindClosestIndex(xWork, x[i]);
        downsampledControlPoints[closestIndex] = 1;
      }
    }

    optionsWork = {
      ...options,
      controlPoints: downsampledControlPoints,
    };
  }
  console.log('downasample spectra');
  return { xWork, yWork, optionsWork, shouldDownsample };
}

function getDownsampleFactor(
  originalLength: number,
  targetResolution: number,
): number {
  return Math.max(1, Math.ceil(originalLength / targetResolution));
}
