/**
 * Center mean of columns
 *
 * @param {Array<Array<number>>} [matrix] - matrix [rows][cols].
 * @returns {number[][]} result
 */
export function matrixCenterZMean(
  matrix: Float64Array[] | number[][] | Float32Array[],
): Float64Array[] | number[][] | Float32Array[] {
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
