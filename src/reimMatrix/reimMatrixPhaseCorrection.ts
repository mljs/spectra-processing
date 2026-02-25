import type { DataReImMatrix } from '../types/index.ts';

export interface ReimMatrixPhaseCorrectionOptions {
  reverse?: boolean;
  inPlace?: boolean;
  /**
   * Direction for phase correction: 'rows' or 'columns'
   * @default 'rows'
   */
  direction?: 'rows' | 'columns';
}

/**
 * Apply phase correction to a complex matrix along rows or columns.
 * All rows must have the same length.
 * @param data - complex matrix with re and im arrays of Float64Array rows
 * @param phi0 - Angle in radians for zero order phase correction
 * @param phi1 - Angle in radians for first order phase correction
 * @param options - options including direction ('rows' or 'columns', default 'rows')
 * @returns - complex matrix with corrected rows or columns
 */
export function reimMatrixPhaseCorrection(
  data: DataReImMatrix,
  phi0 = 0,
  phi1 = 0,
  options: ReimMatrixPhaseCorrectionOptions = {},
): DataReImMatrix {
  const { reverse = false, inPlace = false, direction = 'rows' } = options;

  phi0 = Number.isFinite(phi0) ? phi0 : 0;
  phi1 = Number.isFinite(phi1) ? phi1 : 0;

  const { re, im } = data;
  const numRows = re.length;

  if (numRows === 0) return { re: [], im: [] };

  const numColumns = re[0].length;

  for (let j = 0; j < numRows; j++) {
    if (re[j].length !== numColumns || im[j].length !== numColumns) {
      throw new RangeError(
        `All rows must have the same length. Expected ${numColumns} but row ${j} has length ${re[j].length}.`,
      );
    }
  }

  const resultRe = new Array<Float64Array>(numRows);
  const resultIm = new Array<Float64Array>(numRows);

  // Initialize result arrays
  for (let i = 0; i < numRows; i++) {
    resultRe[i] = inPlace ? re[i] : new Float64Array(numColumns);
    resultIm[i] = inPlace ? im[i] : new Float64Array(numColumns);
  }

  const size = direction === 'rows' ? numColumns : numRows;

  let delta = phi1 / (size - 1);

  if (reverse) {
    delta = -delta;
  }

  const alpha = 2 * Math.sin(delta / 2) ** 2;
  const beta = Math.sin(delta);

  if (direction === 'rows') {
    for (let j = 0; j < numRows; j++) {
      let firstAngle = phi0;
      if (reverse) {
        firstAngle += phi1;
      }

      let cosTheta = Math.cos(firstAngle);
      let sinTheta = Math.sin(firstAngle);

      for (let i = 0; i < numColumns; i++) {
        const r = re[j][i];
        const ii = im[j][i];

        resultRe[j][i] = r * cosTheta - ii * sinTheta;
        resultIm[j][i] = ii * cosTheta + r * sinTheta;

        const newCosTheta = cosTheta - (alpha * cosTheta + beta * sinTheta);
        const newSinTheta = sinTheta - (alpha * sinTheta - beta * cosTheta);

        cosTheta = newCosTheta;
        sinTheta = newSinTheta;
      }
    }
  } else {
    for (let col = 0; col < numColumns; col++) {
      let firstAngle = phi0;
      if (reverse) {
        firstAngle += phi1;
      }

      let cosTheta = Math.cos(firstAngle);
      let sinTheta = Math.sin(firstAngle);

      for (let row = 0; row < numRows; row++) {
        const r = re[row][col];
        const ii = im[row][col];

        resultRe[row][col] = r * cosTheta - ii * sinTheta;
        resultIm[row][col] = ii * cosTheta + r * sinTheta;

        const newCosTheta = cosTheta - (alpha * cosTheta + beta * sinTheta);
        const newSinTheta = sinTheta - (alpha * sinTheta - beta * cosTheta);

        cosTheta = newCosTheta;
        sinTheta = newSinTheta;
      }
    }
  }

  return { re: resultRe, im: resultIm };
}
