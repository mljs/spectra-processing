import { DoubleMatrix } from '../types';

import { matrixCheck } from './matrixCheck';

/**
 * Convert a matrix to a flat Float64Array.
 * @param matrix
 */
export function matrixToArray(matrix: DoubleMatrix): Float64Array {
  matrixCheck(matrix);

  const nbColumns = matrix[0].length;
  const flatten = new Float64Array(matrix.length * nbColumns);
  for (let row = 0; row < matrix.length; row++) {
    const currentRow = row * nbColumns;
    for (let column = 0; column < nbColumns; column++) {
      flatten[currentRow + column] = matrix[row][column];
    }
  }

  return flatten;
}
