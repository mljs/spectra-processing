import { DoubleMatrix } from '../types';

export function matrixCheckRanges(
  matrix: DoubleMatrix,
  boundaries: {
    startRow: number;
    endRow: number;
    startColumn: number;
    endColumn: number;
  },
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
