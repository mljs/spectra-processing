import { Matrix } from 'ml-matrix';

import { xCorrelation } from '../x/xCorrelation';
/**
 * Calculates a correlation matrix based on the columns of the initial matrix
 *
 * @param {Matrix} [A] - matrix [rows][cols]
 * @returns {number[][]} result
 */
export function matrixColumnsCorrelation(
  A: Float64Array[] | number[][] | Float32Array[],
): Float64Array[] | number[][] | Float32Array[] {
  let B: Matrix = new Matrix(A as number[][]);
  B = B.transpose();
  let result: Float64Array[] | number[][] | Float32Array[] = [];
  for (let i = 0; i < B.rows; i++) {
    (result as Float64Array[]).push(new Float64Array(B.rows));
  }
  for (let i = 0; i < B.rows; i++) {
    for (let j = i; j < B.rows; j++) {
      let correlation = xCorrelation(B.getRow(i), B.getRow(j));
      result[i][j] = correlation;
      result[j][i] = correlation;
    }
  }

  return result;
}
