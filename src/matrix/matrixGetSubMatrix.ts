import { DoubleMatrix } from '../types';
import { matrixCreateEmpty } from './index';
import { matrixCheckRanges } from './matrixCheckRanges';

/**
 * Get a subMatrix from matrix, the function check if the subMatrix
 * lies into the dimensions of matrix.
 * @param matrix - matrix that will receive the new element values.
 * @param startRow - row index in matrix for the first row in subMatrix.
 * @param startColumn - column index in matrix for the first column in subMatrix.
 * @returns The modified `matrix`.
 */
export function matrixGetSubMatrix(
  matrix: DoubleMatrix,
  options: {
    startRow: number;
    startColumn: number;
    endRow: number;
    endColumn: number;
  },
): Float64Array[] {
  matrixCheckRanges(matrix, options);
  const { startRow, endRow, startColumn, endColumn } = options;
  const nbColumns = endColumn - startColumn + 1;
  const nbRows = endRow - startRow + 1;

  const subMatrix = matrixCreateEmpty({ nbColumns, nbRows });
  for (let i = 0; i < nbRows; i++) {
    for (let j = 0; j < nbColumns; j++) {
      subMatrix[i][j] = matrix[startRow + i][startColumn + j];
    }
  }
  return subMatrix;
}
