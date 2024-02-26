import { DoubleMatrix } from '../types';

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
  checkRange(matrix, startRow, endRow, startColumn, endColumn);
  for (let i = 0; i < subMatrix.length; i++) {
    for (let j = 0; j < subMatrix[0].length; j++) {
      matrix[startRow + i][startColumn + j] = subMatrix[i][j];
    }
  }
  return matrix;
}

function checkRange(
  matrix: DoubleMatrix,
  startRow: number,
  endRow: number,
  startColumn: number,
  endColumn: number,
) {
  if (
    startRow > endRow ||
    startColumn > endColumn ||
    startRow < 0 ||
    startRow >= matrix.length ||
    endRow < 0 ||
    endRow >= matrix.length ||
    startColumn < 0 ||
    startColumn >= matrix[0].length ||
    endColumn < 0 ||
    endColumn >= matrix[0].length
  ) {
    throw new RangeError('submatrix indices are out of range');
  }
}
