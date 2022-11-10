import { DoubleMatrix, xCorrelation } from '..';

/**
 * returns the median of the matrix
 */

export function matrixAutoCorrelation(
  matrix: DoubleMatrix,
  index = 0,
): Float64Array {
  let nbRows = matrix.length;
  let nbColumns = matrix[0].length;

  if (nbRows < 2) {
    throw new Error(
      'matrixAutoCorrelation: can not calculate info if matrix contains less than 2 rows',
    );
  }

  let targetArray = new Float64Array(nbRows);
  let sourceArray = new Float64Array(nbRows);
  let result = new Float64Array(nbColumns);
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
