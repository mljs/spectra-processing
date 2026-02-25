import FFT from 'fft.js';

import { zeroShift } from '../reim/zeroShift.ts';
import type { DataReImMatrix } from '../types/index.ts';

export interface ReimMatrixFFTByColumnsOptions {
  inverse?: boolean;
  applyZeroShift?: boolean;
  /**
   * Write the result back into the input arrays instead of allocating new ones.
   * @default false
   */
  inPlace?: boolean;
}

/**
 * Apply FFT to each column of a complex matrix, reusing a single FFT instance for
 * all columns to avoid repeated instantiation overhead.
 * All columns must have the same length (all rows must have the same number of columns).
 * @param data - complex matrix with re and im arrays of Float64Array rows
 * @param options - options
 * @returns complex matrix with transformed columns
 */
export function reimMatrixFFTByColumns(
  data: DataReImMatrix,
  options: ReimMatrixFFTByColumnsOptions = {},
): DataReImMatrix {
  const { re, im } = data;
  const numRows = re.length;

  if (numRows === 0) return { re: [], im: [] };

  const { inverse = false, applyZeroShift = false, inPlace = false } = options;

  const numColumns = re[0].length;
  const csize = numRows << 1;

  // Validate all rows have the same number of columns
  for (let j = 0; j < numRows; j++) {
    if (re[j].length !== numColumns || im[j].length !== numColumns) {
      throw new RangeError(
        `All rows must have the same length. Expected ${numColumns} but row ${j} has length ${re[j].length}.`,
      );
    }
  }

  if (numColumns === 0) {
    return { re: new Array(numRows), im: new Array(numRows) };
  }

  // Single FFT instance and working buffers reused across all columns
  const fft = new FFT(numRows);
  const complexArray = new Float64Array(csize);
  const output = new Float64Array(csize);

  const resultRe = new Array<Float64Array>(numRows);
  const resultIm = new Array<Float64Array>(numRows);

  // Initialize result arrays
  for (let i = 0; i < numRows; i++) {
    resultRe[i] = inPlace ? re[i] : new Float64Array(numColumns);
    resultIm[i] = inPlace ? im[i] : new Float64Array(numColumns);
  }

  // Process each column
  for (let col = 0; col < numColumns; col++) {
    // Extract column data into complex array
    for (let row = 0; row < numRows; row++) {
      complexArray[row << 1] = re[row][col];
      complexArray[(row << 1) + 1] = im[row][col];
    }

    const colRe = new Float64Array(numRows);
    const colIm = new Float64Array(numRows);

    if (inverse) {
      const input = applyZeroShift
        ? zeroShift(complexArray, true)
        : complexArray;
      fft.inverseTransform(output, input);
      for (let i = 0; i < csize; i += 2) {
        colRe[i >>> 1] = output[i];
        colIm[i >>> 1] = output[i + 1];
      }
    } else {
      fft.transform(output, complexArray);
      const source = applyZeroShift ? zeroShift(output) : output;
      for (let i = 0; i < csize; i += 2) {
        colRe[i >>> 1] = source[i];
        colIm[i >>> 1] = source[i + 1];
      }
    }

    // Store transformed column back into result matrix
    for (let row = 0; row < numRows; row++) {
      resultRe[row][col] = colRe[row];
      resultIm[row][col] = colIm[row];
    }
  }

  return { re: resultRe, im: resultIm };
}
