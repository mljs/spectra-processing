import FFT from 'fft.js';

import { zeroShift } from '../reim/zeroShift.ts';
import type { DataReIm } from '../types/index.ts';

export interface ReimArrayFFTOptions {
  inverse?: boolean;
  applyZeroShift?: boolean;
}

/**
 * Apply FFT to an array of complex spectra, reusing a single FFT instance for
 * all elements to avoid repeated instantiation overhead.
 * All elements must have the same length.
 * @param data - array of complex spectra
 * @param options - options
 * @returns array of transformed complex spectra
 */
export function reimArrayFFT(
  data: DataReIm[],
  options: ReimArrayFFTOptions = {},
): Array<DataReIm<Float64Array>> {
  if (data.length === 0) return [];

  const { inverse = false, applyZeroShift = false } = options;

  const size = data[0].re.length;
  const csize = size << 1;

  for (let j = 1; j < data.length; j++) {
    if (data[j].re.length !== size || data[j].im.length !== size) {
      throw new RangeError(
        `All elements must have the same length. Expected ${size} but element ${j} has length ${data[j].re.length}.`,
      );
    }
  }

  // Single FFT instance and working buffers reused across all spectra
  const fft = new FFT(size);
  const complexArray = new Float64Array(csize);
  const output = new Float64Array(csize);

  const results = new Array<DataReIm<Float64Array>>(data.length);

  for (let j = 0; j < data.length; j++) {
    const { re, im } = data[j];

    for (let i = 0; i < csize; i += 2) {
      complexArray[i] = re[i >>> 1];
      complexArray[i + 1] = im[i >>> 1];
    }

    const newRe = new Float64Array(size);
    const newIm = new Float64Array(size);

    if (inverse) {
      const input = applyZeroShift
        ? zeroShift(complexArray, true)
        : complexArray;
      fft.inverseTransform(output, input);
      for (let i = 0; i < csize; i += 2) {
        newRe[i >>> 1] = output[i];
        newIm[i >>> 1] = output[i + 1];
      }
    } else {
      fft.transform(output, complexArray);
      const source = applyZeroShift ? zeroShift(output) : output;
      for (let i = 0; i < csize; i += 2) {
        newRe[i >>> 1] = source[i];
        newIm[i >>> 1] = source[i + 1];
      }
    }

    results[j] = { re: newRe, im: newIm };
  }

  return results;
}
