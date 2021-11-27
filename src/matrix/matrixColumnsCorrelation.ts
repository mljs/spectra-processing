import { DoubleArray } from 'cheminfo-types';
import { Matrix } from 'ml-matrix';

import { xCorrelation } from '../x/xCorrelation';
/**
 * Calculates a correlation matrix based on the columns of the initial matrix
 *
 * @param [A] - matrix [rows][cols]
 * @returns result
 */
export function matrixColumnsCorrelation(A: DoubleArray[]): DoubleArray[] {
  let B: Matrix = new Matrix(A as [][]);
  B = B.transpose();
  let result = [];
  for (let i = 0; i < B.rows; i++) {
    result.push(new Float64Array(B.rows));
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
