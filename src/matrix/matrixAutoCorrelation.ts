import type { DoubleMatrix } from 'cheminfo-types';

import { xCorrelation } from '../x/index.ts';

/**
 * Correlates every column of a matrix against a single reference column.
 * @param matrix - 2D matrix with at least 2 rows
 * @param index - column index used as the reference signal. Defaults to `0`.
 * @returns array of Pearson correlations, one value per column
 */
export function matrixAutoCorrelation(
  matrix: DoubleMatrix,
  index = 0,
): Float64Array<ArrayBuffer> {
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
