import { DoubleMatrix } from '..';

/**
 * Get min and max Z
 *
 * @param matrix - matrix [rows][cols].
 */
export function matrixMinMaxZ(matrix: DoubleMatrix): {
  max: number;
  min: number;
} {
  if (matrix.length === 0 || matrix[0].length === 0) {
    throw new Error('matrixMinMaxZ requires at least 1 row and 1 column');
  }
  const nbRows = matrix.length;
  const nbColumns = matrix[0].length;

  let min = matrix[0][0];
  let max = matrix[0][0];

  for (let column = 0; column < nbColumns; column++) {
    for (let row = 0; row < nbRows; row++) {
      if (matrix[row][column] < min) min = matrix[row][column];
      if (matrix[row][column] > max) max = matrix[row][column];
    }
  }

  return { min, max };
}
