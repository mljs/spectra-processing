import { DoubleMatrix } from '../types';
import { xMedian } from '../x';

/**
 * Returns the median of the absolute matrix.
 */
export function matrixAbsoluteMedian(matrix: DoubleMatrix): number {
  const nbColumns = matrix[0].length;
  const flatten = new Float64Array(matrix.length * nbColumns);
  for (let row = 0; row < matrix.length; row++) {
    const currentRow = row * nbColumns;
    for (let column = 0; column < nbColumns; column++) {
      const value = matrix[row][column];
      flatten[currentRow + column] = value < 0 ? -value : value;
    }
  }
  return xMedian(flatten);
}
