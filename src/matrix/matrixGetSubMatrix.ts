import { matrixCheckRanges } from './matrixCheckRanges';

export interface MatrixGetSubMatrixOptions {
  /**
   * row index in matrix for the first row in subMatrix.
   * @default 0
   */
  startRow: number;
  /**
   * column index in matrix for the first column in subMatrix.
   * @default 0
   */
  startColumn: number;
  /**
   * row index in matrix for the last row in subMatrix.
   * @default matrix.length - 1
   */
  endRow: number;
  /**
   * column index in matrix for the last column in subMatrix.
   * @default matrix[0].length - 1
   */
  endColumn: number;
  /**
   * duplicate the data
   * @default true
   */
  duplicate?: boolean;
}
/**
 * Get a subMatrix from matrix, the function check if the subMatrix
 * lies into the dimensions of matrix.
 * @param matrix - matrix that will receive the new element values.
 * @returns The sub `matrix`.
 */
export function matrixGetSubMatrix(
  matrix: Float64Array[],
  options: MatrixGetSubMatrixOptions,
): Float64Array[] {
  const {
    startRow = 0,
    endRow = matrix.length - 1,
    startColumn = 0,
    endColumn = matrix[0].length - 1,
    duplicate = true,
  } = options;
  matrixCheckRanges(matrix, { startColumn, startRow, endColumn, endRow });
  const nbRows = endRow - startRow + 1;

  const subMatrix: Float64Array[] = [];
  if (duplicate) {
    for (let i = 0; i < nbRows; i++) {
      subMatrix.push(matrix[startRow + i].slice(startColumn, endColumn + 1));
    }
  } else {
    for (let i = 0; i < nbRows; i++) {
      subMatrix.push(matrix[startRow + i].subarray(startColumn, endColumn + 1));
    }
  }

  return subMatrix;
}
