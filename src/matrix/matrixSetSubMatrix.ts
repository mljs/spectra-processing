import { DoubleMatrix } from '..';

export function matrixSetSubMatrix(
  matrix: DoubleMatrix,
  subMatrix: DoubleMatrix,
  startRow: number,
  startColumn: number,
) {
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
  if (arguments.length !== 5) {
    throw new RangeError('expected 4 arguments');
  }
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
    throw new RangeError('Submatrix indices are out of range');
  }
}
