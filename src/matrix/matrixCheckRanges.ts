import type { DoubleMatrix } from '../types';

export interface SubmatrixBoundaries {
  /**
   * The starting row index of the submatrix.
   */
  startRow: number;
  /**
   * The ending row index of the submatrix.
   */
  endRow: number;
  /**
   * The starting column index of the submatrix.
   */
  startColumn: number;
  /**
   * The ending column index of the submatrix.
   */
  endColumn: number;
}

/**
 * Checks if the specified submatrix boundaries are within the valid range of the given matrix.
 * @param matrix - The matrix to check the boundaries against.
 * @param boundaries - The boundaries of the submatrix.
 * @throws {RangeError} If any of the specified boundaries are out of the matrix's range.
 */
export function matrixCheckRanges(
  matrix: DoubleMatrix,
  boundaries: SubmatrixBoundaries,
) {
  const { startRow, endRow, startColumn, endColumn } = boundaries;
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
