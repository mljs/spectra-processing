import FFT from 'fft.js';

import type { DataReIm } from '../types/index.ts';

import { zeroShift } from './zeroShift.ts';

// An FFT instance precomputes size-dependent twiddle factors and a bit-reversal
// table; for a 64k transform that setup dominates the cost. Cache one instance
// per size so repeated calls (e.g. transforming many spectra of equal length)
// reuse it instead of rebuilding it on every transform.
const MAX_FFT_CACHE_SIZE = 10;
const fftCache = new Map<number, FFT>();

function getFFT(size: number): FFT {
  let fft = fftCache.get(size);
  if (fft === undefined) {
    // Bound the cache so transforming many different sizes cannot grow it
    // without limit. Rather than track insertion order to evict a single
    // entry, drop everything once full: distinct sizes are rare, so the common
    // single-size workload never hits this and stays at full speed.
    if (fftCache.size >= MAX_FFT_CACHE_SIZE) fftCache.clear();
    fft = new FFT(size);
    fftCache.set(size, fft);
  }
  return fft;
}

export interface ReimFFTOptions {
  inverse?: boolean;
  applyZeroShift?: boolean;
  /**
   * Write the result back into the input arrays instead of allocating new ones.
   * @default false
   */
  inPlace?: boolean;
}

/**
 * Computes the FFT of a complex spectrum.
 * @param data - complex spectrum.
 * @param options - options.
 * @returns FFT of complex spectrum.
 */
export function reimFFT(
  data: DataReIm,
  options: ReimFFTOptions = {},
): DataReIm<Float64Array> {
  const { inverse = false, applyZeroShift = false, inPlace = false } = options;

  const { re, im } = data;
  const size = re.length;
  const csize = size << 1;

  let complexArray = new Float64Array(csize);
  for (let i = 0; i < csize; i += 2) {
    complexArray[i] = re[i >>> 1];
    complexArray[i + 1] = im[i >>> 1];
  }

  const fft = getFFT(size);
  let output = new Float64Array(csize);
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
  }

  const newRe = new Float64Array(size);
  const newIm = new Float64Array(size);
  for (let i = 0; i < csize; i += 2) {
    newRe[i >>> 1] = output[i];
    newIm[i >>> 1] = output[i + 1];
  }

  return { re: newRe, im: newIm };
}
