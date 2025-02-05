import type { DoubleMatrix } from '../types';
import { xCorrelation } from '../x';

/**
 * Computes the auto-correlation of a matrix along a specified column index.
 * @param matrix - The input matrix of type DoubleMatrix.
 * @param index - The column index to use for auto-correlation (default is 0).
 * @returns A Float64Array containing the auto-correlation values for each column.
 * @throws Will throw an error if the matrix contains less than 2 rows.
 */
export function matrixAutoCorrelation(
  matrix: DoubleMatrix,
  index = 0,
): Float64Array {
  const nbRows = matrix.length;
  const nbColumns = matrix[0].length;

  if (nbRows < 2) {
    throw new Error(
      'can not calculate info if matrix contains less than 2 rows',
    );
  }

  const targetArray = new Float64Array(nbRows);
  const sourceArray = new Float64Array(nbRows);
  const result = new Float64Array(nbColumns);
  for (let j = 0; j < nbRows; j++) {
    targetArray[j] = matrix[j][index];
  }
  for (let i = 0; i < nbColumns; i++) {
    for (let j = 0; j < nbRows; j++) {
      sourceArray[j] = matrix[j][i];
    }
    result[i] = xCorrelation(targetArray, sourceArray);
  }
  return result;
}
