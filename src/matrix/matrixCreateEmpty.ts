import {
  DoubleMatrix,
  DoubleArrayConstructor,
  DoubleArrayType,
} from '../types';

export interface MatrixCreateEmptyOptions<
  ArrayConstructorType extends DoubleArrayConstructor = Float64ArrayConstructor,
> {
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
   * @default Float64Array
   */
  ArrayConstructor?: ArrayConstructorType;
}

/**
 * Create a new matrix based on the size of the current one or by using specific dimensions
 * Take care that if you specify as ArrayConstructor an Array, the matrix will be filled with 'uhdefined' and not with 0
 */
export function matrixCreateEmpty<
  ArrayConstructorType extends DoubleArrayConstructor = Float64ArrayConstructor,
>(
  options: MatrixCreateEmptyOptions<ArrayConstructorType>,
): Array<DoubleArrayType<ArrayConstructorType>> {
  const {
    matrix,
    nbRows = matrix?.length || 1,
    nbColumns = matrix?.[0].length || 1,
    ArrayConstructor = Float64Array,
  } = options;

  const newMatrix: Array<DoubleArrayType<ArrayConstructorType>> = [];
  for (let row = 0; row < nbRows; row++) {
    newMatrix.push(
      new ArrayConstructor(nbColumns) as DoubleArrayType<ArrayConstructorType>,
    );
  }
  return newMatrix;
}
