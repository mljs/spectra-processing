import FFT from 'fft.js';

import type { DataReIm } from '../types/index.ts';
import { xRotate } from '../x/index.ts';

let output: Float64Array | undefined;
let complexArray: Float64Array | undefined;
let fft: FFT | undefined;
export interface ReimFFTOptions {
  inverse?: boolean;
  applyZeroShift?: boolean;
  inPlace?: boolean;
}

/**
 * ReimFFT.
 * @param data - complex spectrum
 * @param options - options.
 * @returns FFT of complex spectrum.
 */
export function reimFFT(
  data: DataReIm,
  options: ReimFFTOptions = {},
): DataReIm<Float64Array> {
  const { re, im } = data;
  const size = re.length;
  const csize = size << 1;

  const { inPlace = false, inverse = false, applyZeroShift = false } = options;

  if (fft?.size !== size) fft = new FFT(size);

  if (complexArray?.length !== csize) complexArray = new Float64Array(csize);
  for (let i = 0; i < csize; i += 2) {
    complexArray[i] = re[i >>> 1];
    complexArray[i + 1] = im[i >>> 1];
  }

  if (output?.length !== csize) output = new Float64Array(csize);
  if (inverse) {
    if (applyZeroShift) complexArray = zeroShift(complexArray, true);
    fft.inverseTransform(output, complexArray);
  } else {
    fft.transform(output, complexArray);
    if (applyZeroShift) output = zeroShift(output);
  }

  if (inPlace) {
    for (let i = 0; i < csize; i += 2) {
      re[i >>> 1] = output[i];
      im[i >>> 1] = output[i + 1];
    }
    return data as DataReIm<Float64Array>;
  } else {
    const newRe = new Float64Array(size);
    const newIm = new Float64Array(size);
    for (let i = 0; i < csize; i += 2) {
      newRe[i >>> 1] = output[i];
      newIm[i >>> 1] = output[i + 1];
    }
    return { re: newRe, im: newIm };
  }
}

function zeroShift(
  data: Float64Array,
  inverse?: boolean,
): Float64Array<ArrayBuffer> {
  const middle = inverse
    ? Math.ceil(data.length / 2)
    : Math.floor(data.length / 2);
  return xRotate(data, middle);
}
