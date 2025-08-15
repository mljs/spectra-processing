import { Matrix } from 'ml-matrix';

import type { DoubleMatrix } from '../types/index.ts';
import { xCorrelation } from '../x/index.ts';

/**
 * Calculates a correlation matrix based on the columns of the initial matrix.
 * @param A - matrix [rows][cols]
 */
export function matrixColumnsCorrelation(
  A: DoubleMatrix,
): Array<Float64Array<ArrayBuffer>> {
  const B = new Matrix(A).transpose();
  const result: Array<Float64Array<ArrayBuffer>> = [];
  for (let i = 0; i < B.rows; i++) {
    result.push(new Float64Array(B.rows));
  }
  for (let i = 0; i < B.rows; i++) {
    for (let j = i; j < B.rows; j++) {
      const correlation = xCorrelation(B.getRow(i), B.getRow(j));
      result[i][j] = correlation;
      result[j][i] = correlation;
    }
  }

  return result;
}
