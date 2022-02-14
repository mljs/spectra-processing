import { DoubleMatrix } from '..';

/**
 * Center mean of columns
 *
 * @param matrix - matrix [rows][cols]
 */
export function matrixCenterZMean(matrix: DoubleMatrix): DoubleMatrix {
  const nbRows = matrix.length;
  const nbColumns = matrix[0].length;
  const newMatrix = new Array(nbRows);
  for (let row = 0; row < nbRows; row++) {
    newMatrix[row] = new Float64Array(nbColumns);
  }
  for (let column = 0; column < nbColumns; column++) {
    let mean = 0;
    for (let row = 0; row < nbRows; row++) {
      mean += matrix[row][column];
    }
    mean /= nbRows;
    for (let row = 0; row < nbRows; row++) {
      newMatrix[row][column] = matrix[row][column] - mean;
    }
  }
  return newMatrix;
}
