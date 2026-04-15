import type { DataXY } from 'cheminfo-types';

import type { XBinningOptions } from '../x/index.ts';
import { xBinning, xCheck } from '../x/index.ts';

import { xyCheck } from './xyCheck.ts';

/**
 * Downsample y values by averaging consecutive non-overlapping points and
 * place x at the center of each corresponding x bin.
 * @param data - Object that contains x and y arrays.
 * @param options - Binning options (same as xBinning).
 * @returns Downsampled x and y arrays.
 */
export function xyBinning(
  data: DataXY,
  options: XBinningOptions = {},
): DataXY<Float64Array> {
  xyCheck(data);
  const { x, y } = data;
  xCheck(x);
  const binnedY = xBinning(y, options);
  const binnedX = new Float64Array(binnedY.length);
  const bins = getBins(x.length, options);

  for (let i = 0; i < bins.length; i++) {
    const [start, end] = bins[i];
    binnedX[i] = (x[start] + x[end - 1]) / 2;
  }

  return { x: binnedX, y: binnedY };
}

function getBins(
  length: number,
  options: XBinningOptions,
): Array<[start: number, end: number]> {
  const { numberOfPoints, keepFirstAndLast = true } = options;
  if (numberOfPoints !== undefined) {
    if (keepFirstAndLast) {
      if (numberOfPoints === 2) {
        return [
          [0, 1],
          [length - 1, length],
        ];
      }

      const bins: Array<[number, number]> = [[0, 1]];
      const innerLength = length - 2;
      const innerBins = numberOfPoints - 2;
      for (let j = 0; j < innerBins; j++) {
        const start = 1 + Math.floor((j * innerLength) / innerBins);
        const end = 1 + Math.floor(((j + 1) * innerLength) / innerBins);
        bins.push([start, end]);
      }
      bins.push([length - 1, length]);
      return bins;
    }

    const bins: Array<[number, number]> = [];
    for (let j = 0; j < numberOfPoints; j++) {
      const start = Math.floor((j * length) / numberOfPoints);
      const end = Math.floor(((j + 1) * length) / numberOfPoints);
      bins.push([start, end]);
    }
    return bins;
  }

  const effectiveBinSize = options.binSize ?? 10;
  if (effectiveBinSize === 1 || (keepFirstAndLast && length <= 2)) {
    return Array.from({ length }, (_, i) => [i, i + 1]);
  }

  if (keepFirstAndLast) {
    const bins: Array<[number, number]> = [[0, 1]];
    const innerLength = length - 2;
    for (let i = 0; i < innerLength; i += effectiveBinSize) {
      const start = i + 1;
      const end = Math.min(start + effectiveBinSize, length - 1);
      bins.push([start, end]);
    }
    bins.push([length - 1, length]);
    return bins;
  }

  const bins: Array<[number, number]> = [];
  for (let i = 0; i < length; i += effectiveBinSize) {
    const end = Math.min(i + effectiveBinSize, length);
    bins.push([i, end]);
  }
  return bins;
}
