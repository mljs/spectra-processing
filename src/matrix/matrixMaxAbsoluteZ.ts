import { NumberArray } from 'cheminfo-types';

/**
 * Returns the max absolute values of Z.
 * @param matrix - matrix [rows][cols].
 */
export function matrixMaxAbsoluteZ(matrix: NumberArray[]): number {
  if (matrix.length === 0 || matrix[0].length === 0) {
    throw new Error('matrix must have at least 1 row and 1 column');
  }
  const nbRows = matrix.length;
  const nbColumns = matrix[0].length;

  let max = Number.NEGATIVE_INFINITY;

  for (let column = 0; column < nbColumns; column++) {
    for (let row = 0; row < nbRows; row++) {
      const value = Math.abs(matrix[row][column]);
      if (value > max) max = value;
    }
  }

  return max;
}
