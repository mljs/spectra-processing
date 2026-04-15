import type { DataXY } from 'cheminfo-types';

import type { XBinningOptions } from '../x/index.ts';
import { xBinning } from '../x/index.ts';

import { xyCheck } from './xyCheck.ts';

/**
 * Downsample x and y by averaging consecutive non-overlapping points.
 * Both arrays are binned with the same partitioning, so the resulting x
 * is the mean x of each bin.
 * @param data - Object that contains x and y arrays.
 * @param options - Binning options (same as xBinning).
 * @returns Downsampled x and y arrays.
 */
export function xyBinning(
  data: DataXY,
  options: XBinningOptions = {},
): DataXY<Float64Array> {
  xyCheck(data);
  return {
    x: xBinning(data.x, options),
    y: xBinning(data.y, options),
  };
}
