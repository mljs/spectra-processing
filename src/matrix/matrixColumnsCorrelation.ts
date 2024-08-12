import { Matrix } from 'ml-matrix';

import { DoubleMatrix } from '../types';
import { xCorrelation } from '../x';

/**
 * Calculates a correlation matrix based on the columns of the initial matrix.
 * @param A - matrix [rows][cols]
 */
export function matrixColumnsCorrelation(A: DoubleMatrix): Float64Array[] {
  const B = new Matrix(A).transpose();
  const result: Float64Array[] = [];
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
