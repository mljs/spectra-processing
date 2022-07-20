import { DoubleMatrix } from '..';

/**
 * Create a new matrix based on the size of the current one
 */
export function matrixCreateEmpty(options: {
  /**
   * Matrix from which to extract nbRows and nbColumns
   */
  matrix?: DoubleMatrix;
  /**
   * Matrix from which to extract nbRows and nbColumns
   * @default matrix.length || 1
   */
  nbRows?: number;
  /**
   * Matrix from which to extract nbRows and nbColumns
   * @default matrix[0].length || 1
   */
  nbColumns?: number;
}): DoubleMatrix {
  const {
    matrix,
    nbRows = matrix?.length || 1,
    nbColumns = matrix?.[0].length || 1,
  } = options;

  const newMatrix = new Array(nbRows);
  for (let row = 0; row < nbRows; row++) {
    newMatrix[row] = new Float64Array(nbColumns);
  }
  return newMatrix;
}
