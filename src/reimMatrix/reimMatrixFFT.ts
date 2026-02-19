import FFT from 'fft.js';

import { zeroShift } from '../reim/zeroShift.ts';
import type { DataReImMatrix } from '../types/index.ts';

export interface ReimMatrixFFTOptions {
  inverse?: boolean;
  applyZeroShift?: boolean;
  /**
   * Write the result back into the input arrays instead of allocating new ones.
   * @default false
   */
  inPlace?: boolean;
}

/**
 * Apply FFT to each row of a complex matrix, reusing a single FFT instance for
 * all rows to avoid repeated instantiation overhead.
 * All rows must have the same length.
 * @param data - complex matrix with re and im arrays of Float64Array rows
 * @param options - options
 * @returns complex matrix with transformed rows
 */
export function reimMatrixFFT(
  data: DataReImMatrix,
  options: ReimMatrixFFTOptions = {},
): DataReImMatrix {
  const { re, im } = data;
  const numRows = re.length;

  if (numRows === 0) return { re: [], im: [] };

  const { inverse = false, applyZeroShift = false, inPlace = false } = options;

  const size = re[0].length;
  const csize = size << 1;

  for (let j = 0; j < numRows; j++) {
    if (re[j].length !== size || im[j].length !== size) {
      throw new RangeError(
        `All rows must have the same length. Expected ${size} but row ${j} has length ${re[j].length}.`,
      );
    }
  }

  // Single FFT instance and working buffers reused across all rows
  const fft = new FFT(size);
  const complexArray = new Float64Array(csize);
  const output = new Float64Array(csize);

  const resultRe = new Array<Float64Array>(numRows);
  const resultIm = new Array<Float64Array>(numRows);

  for (let j = 0; j < numRows; j++) {
    const reRow = re[j];
    const imRow = im[j];

    for (let i = 0; i < csize; i += 2) {
      complexArray[i] = reRow[i >>> 1];
      complexArray[i + 1] = imRow[i >>> 1];
    }

    const outRe = inPlace ? reRow : new Float64Array(size);
    const outIm = inPlace ? imRow : new Float64Array(size);

    if (inverse) {
      const input = applyZeroShift
        ? zeroShift(complexArray, true)
        : complexArray;
      fft.inverseTransform(output, input);
      for (let i = 0; i < csize; i += 2) {
        outRe[i >>> 1] = output[i];
        outIm[i >>> 1] = output[i + 1];
      }
    } else {
      fft.transform(output, complexArray);
      const source = applyZeroShift ? zeroShift(output) : output;
      for (let i = 0; i < csize; i += 2) {
        outRe[i >>> 1] = source[i];
        outIm[i >>> 1] = source[i + 1];
      }
    }

    resultRe[j] = outRe;
    resultIm[j] = outIm;
  }

  return { re: resultRe, im: resultIm };
}
