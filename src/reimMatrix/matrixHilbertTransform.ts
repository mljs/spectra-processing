import FFT from 'fft.js';

import { isPowerOfTwo } from '../utils/index.ts';

export interface MatrixHilbertTransformOptions {
  /**
   * Write the result back into the input arrays instead of allocating new ones.
   * @default false
   */
  inPlace?: boolean;
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

  const { inPlace = false } = options;

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
  const multiplier = new Float64Array(size);
  for (let i = 1; i < size; i++) {
    multiplier[i] = Math.sign(size / 2 - i);
  }

  // Shared working buffers reused across all rows
  const fftResult = new Float64Array(size * 2);
  const hilbertSignal = new Float64Array(size * 2);

  const results = new Array<Float64Array>(rows.length);

  for (let j = 0; j < rows.length; j++) {
    const row = rows[j];

    fft.realTransform(fftResult, row);
    fft.completeSpectrum(fftResult);

    for (let i = 0; i < size; i++) {
      fftResult[i * 2] *= multiplier[i];
      fftResult[i * 2 + 1] *= multiplier[i];
    }

    fft.inverseTransform(hilbertSignal, fftResult);

    const output = inPlace ? row : new Float64Array(size);
    for (let i = 0; i < size; i++) {
      output[i] = hilbertSignal[i * 2 + 1];
    }

    results[j] = output;
  }

  return results;
}
