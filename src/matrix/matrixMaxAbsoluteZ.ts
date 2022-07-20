import { DoubleMatrix } from '..';

/**
 * Returns the max absolute values of Z
 *
 * @param matrix - matrix [rows][cols].
 */
export function matrixMaxAbsoluteZ(matrix: DoubleMatrix): number {
  if (matrix.length === 0 || matrix[0].length === 0) {
    throw new Error('matrixMaxAbsoluteZ requires at least 1 row and 1 column');
  }
  const nbRows = matrix.length;
  const nbColumns = matrix[0].length;

  let max = Number.NEGATIVE_INFINITY;

  for (let column = 0; column < nbColumns; column++) {
    for (let row = 0; row < nbRows; row++) {
      let value = matrix[row][column];
      if (value < 0) value *= -1;
      if (value > max) max = value;
    }
  }

  return max;
}
