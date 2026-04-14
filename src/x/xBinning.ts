import type { NumberArray } from 'cheminfo-types';

import { xCheck } from './xCheck.ts';

/**
 * Downsample an array by averaging consecutive non-overlapping points (binning).
 * @param array - Input array.
 * @param binSize - Number of consecutive points to average per bin. Must be a positive integer.
 * @returns Downsampled array of length `ceil(array.length / binSize)`.
 */
export function xBinning(
  array: NumberArray,
  binSize: number,
): Float64Array<ArrayBuffer> {
  xCheck(array);
  if (!Number.isInteger(binSize) || binSize <= 0) {
    throw new RangeError('binSize must be a positive integer');
  }
  if (binSize === 1) {
    return Float64Array.from(array);
  }

  const { length } = array;
  const outputLength = Math.ceil(length / binSize);
  const output = new Float64Array(outputLength);

  for (let i = 0, j = 0; i < length; i += binSize, j++) {
    const end = Math.min(i + binSize, length);
    let sum = 0;
    for (let k = i; k < end; k++) {
      sum += array[k];
    }
    output[j] = sum / (end - i);
  }

  return output;
}
