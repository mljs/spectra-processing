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
  /**
   * Allows to specify the type of array to use
   */
  ArrayConstructor?: any;
}): DoubleMatrix {
  const {
    matrix,
    nbRows = matrix?.length || 1,
    nbColumns = matrix?.[0].length || 1,
    ArrayConstructor = Float64Array,
  } = options;

  const newMatrix = new Array(nbRows);
  for (let row = 0; row < nbRows; row++) {
    newMatrix[row] = new ArrayConstructor(nbColumns);
  }
  return newMatrix;
}
