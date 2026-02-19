import FFT from 'fft.js';

import { isPowerOfTwo } from '../utils/index.ts';

import { matrixCreateEmpty } from './matrixCreateEmpty.ts';

export interface MatrixHilbertTransformOptions {
  /**
   * Float64Array[] variable to store the result of hilbert transform
   */
  output?: Float64Array[];
}

/**
 * Apply the Hilbert transform to each row of a real-valued matrix, reusing a
 * single FFT instance for all rows to avoid repeated instantiation overhead.
 * All rows must have the same length, which must be a power of two.
 * @param rows - array of real-valued Float64Array rows
 * @param options - options
 * @returns array of Hilbert-transformed Float64Array rows
 * @see DOI: 10.1109/TAU.1970.1162139 "Discrete Hilbert transform"
 */
export function matrixHilbertTransform(
  rows: Float64Array[],
  options: MatrixHilbertTransformOptions = {},
): Float64Array[] {
  if (rows.length === 0) return [];

  const size = rows[0].length;

  if (!isPowerOfTwo(size)) {
    throw new RangeError(`Row length must be a power of two. Got ${size}.`);
  }

  for (let j = 1; j < rows.length; j++) {
    if (rows[j].length !== size) {
      throw new RangeError(
        `All rows must have the same length. Expected ${size} but row ${j} has length ${rows[j].length}.`,
      );
    }
  }

  // Single FFT instance reused across all rows
  const fft = new FFT(size);

  // Multiplier computed once — identical for every row of the same length
  const half = size >> 1;

  // Shared working buffers reused across all rows
  const fftResult = new Float64Array(size * 2);
  const hilbertSignal = new Float64Array(size * 2);

  const {
    output = matrixCreateEmpty({
      nbRows: rows.length,
      nbColumns: size,
    }),
  } = options;

  for (let j = 0; j < rows.length; j++) {
    const row = rows[j];

    fft.realTransform(fftResult, row);
    fft.completeSpectrum(fftResult);

    const idx = half << 1;
    fftResult[idx] = 0;
    fftResult[idx + 1] = 0;

    // Negate negative frequencies
    for (let c = (half + 1) << 1; c < fftResult.length; c += 2) {
      fftResult[c] = -fftResult[c];
      fftResult[c + 1] = -fftResult[c + 1];
    }

    fft.inverseTransform(hilbertSignal, fftResult);

    const result = output[j];
    for (let i = 0; i < size; i++) {
      result[i] = hilbertSignal[i * 2 + 1];
    }
  }

  return output;
}
