import type { DoubleMatrix } from '../types';

import { matrixCheckRanges } from './matrixCheckRanges';

/**
 * Set in-place a subMatrix to matrix, the function check if the subMatrix
 * lies into the dimensions of matrix.
 * @param matrix - matrix that will receive the new element values.
 * @param subMatrix - matrix with equal or less size than matrix.
 * @param startRow - row index in matrix for the first row in subMatrix.
 * @param startColumn - column index in matrix for the first column in subMatrix.
 * @returns The modified `matrix`.
 */
export function matrixSetSubMatrix(
  matrix: DoubleMatrix,
  subMatrix: DoubleMatrix,
  startRow: number,
  startColumn: number,
): DoubleMatrix {
  const endRow = startRow + subMatrix.length - 1;
  const endColumn = startColumn + subMatrix[0].length - 1;
  matrixCheckRanges(matrix, { startRow, endRow, startColumn, endColumn });
  for (let i = 0; i < subMatrix.length; i++) {
    for (let j = 0; j < subMatrix[0].length; j++) {
      matrix[startRow + i][startColumn + j] = subMatrix[i][j];
    }
  }
  return matrix;
}
