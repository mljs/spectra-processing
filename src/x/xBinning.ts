import type { NumberArray } from 'cheminfo-types';

import { xCheck } from './xCheck.ts';

export interface XBinningOptions {
  /**
   * Number of consecutive points to average per bin. Must be a positive integer.
   * Ignored when `numberOfPoints` is provided.
   * @default 10
   */
  binSize?: number;
  /**
   * Target number of points in the output. When provided, the input is split
   * into `numberOfPoints` contiguous bins of as-equal-as-possible size, and
   * takes precedence over `binSize`. Must be a positive integer and
   * `<= array.length`.
   */
  numberOfPoints?: number;
  /**
   * If `true`, the first and last points of the input are preserved unchanged
   * in the output (useful to keep the exact domain endpoints of a spectrum).
   * The intermediate points (indices `1` to `length - 2`) are binned.
   * @default true
   */
  keepFirstAndLast?: boolean;
}

/**
 * Downsample an array by averaging consecutive non-overlapping points (binning).
 * Either specify a fixed `binSize` or a target `numberOfPoints`.
 * @param array - Input array.
 * @param options - Options.
 * @returns Downsampled array.
 */
export function xBinning(
  array: NumberArray,
  options: XBinningOptions = {},
): Float64Array<ArrayBuffer> {
  xCheck(array);
  const { binSize, numberOfPoints, keepFirstAndLast = true } = options;
  const { length } = array;

  if (numberOfPoints !== undefined) {
    if (binSize !== undefined) {
      throw new RangeError('binSize and numberOfPoints are mutually exclusive');
    }
    if (!Number.isInteger(numberOfPoints) || numberOfPoints <= 0) {
      throw new RangeError('numberOfPoints must be a positive integer');
    }
    if (numberOfPoints > length) {
      throw new RangeError('numberOfPoints must be <= array.length');
    }
    return binByNumberOfPoints(array, numberOfPoints, keepFirstAndLast);
  }

  const effectiveBinSize = binSize ?? 10;
  if (!Number.isInteger(effectiveBinSize) || effectiveBinSize <= 0) {
    throw new RangeError('binSize must be a positive integer');
  }
  if (effectiveBinSize === 1) {
    return Float64Array.from(array);
  }

  if (keepFirstAndLast) {
    if (length <= 2) {
      return Float64Array.from(array);
    }
    const innerLength = length - 2;
    const innerBinCount = Math.ceil(innerLength / effectiveBinSize);
    const output = new Float64Array(innerBinCount + 2);
    output[0] = array[0];
    output[output.length - 1] = array[length - 1];
    for (let i = 0, j = 1; i < innerLength; i += effectiveBinSize, j++) {
      const start = i + 1;
      const end = Math.min(start + effectiveBinSize, length - 1);
      let sum = 0;
      for (let k = start; k < end; k++) {
        sum += array[k];
      }
      output[j] = sum / (end - start);
    }
    return output;
  }

  const outputLength = Math.ceil(length / effectiveBinSize);
  const output = new Float64Array(outputLength);

  for (let i = 0, j = 0; i < length; i += effectiveBinSize, j++) {
    const end = Math.min(i + effectiveBinSize, length);
    let sum = 0;
    for (let k = i; k < end; k++) {
      sum += array[k];
    }
    output[j] = sum / (end - i);
  }

  return output;
}

function binByNumberOfPoints(
  array: NumberArray,
  numberOfPoints: number,
  keepFirstAndLast: boolean,
): Float64Array<ArrayBuffer> {
  const { length } = array;
  const output = new Float64Array(numberOfPoints);

  if (keepFirstAndLast) {
    if (numberOfPoints < 2) {
      throw new RangeError(
        'numberOfPoints must be >= 2 when keepFirstAndLast is true',
      );
    }
    output[0] = array[0];
    output[numberOfPoints - 1] = array[length - 1];
    if (numberOfPoints === 2) {
      return output;
    }
    const innerLength = length - 2;
    const innerBins = numberOfPoints - 2;
    if (innerBins > innerLength) {
      throw new RangeError(
        'numberOfPoints is too large for the given array length with keepFirstAndLast',
      );
    }
    for (let j = 0; j < innerBins; j++) {
      const start = 1 + Math.floor((j * innerLength) / innerBins);
      const end = 1 + Math.floor(((j + 1) * innerLength) / innerBins);
      let sum = 0;
      for (let k = start; k < end; k++) {
        sum += array[k];
      }
      output[j + 1] = sum / (end - start);
    }
    return output;
  }

  for (let j = 0; j < numberOfPoints; j++) {
    const start = Math.floor((j * length) / numberOfPoints);
    const end = Math.floor(((j + 1) * length) / numberOfPoints);
    let sum = 0;
    for (let k = start; k < end; k++) {
      sum += array[k];
    }
    output[j] = sum / (end - start);
  }
  return output;
}
