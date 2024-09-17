import { DoubleMatrix } from '../types';
import { xMedian } from '../x';

/**
 * Returns the median of the absolute matrix.
 * @param matrix
 */
export function matrixAbsoluteMedian(matrix: DoubleMatrix): number {
  const nbColumns = matrix[0].length;
  const flatten = new Float64Array(matrix.length * nbColumns);
  for (let row = 0; row < matrix.length; row++) {
    const currentRow = row * nbColumns;
    for (let column = 0; column < nbColumns; column++) {
      const value = matrix[row][column];
      flatten[currentRow + column] = Math.abs(value);
    }
  }
  return xMedian(flatten);
}
