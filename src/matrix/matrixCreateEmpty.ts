import { DoubleMatrix } from '../types';
import {
  createNumberArray,
  NumberArrayConstructor,
  NumberArrayType,
} from '../utils';

export interface MatrixCreateEmptyOptions<
  ArrayConstructorType extends NumberArrayConstructor = Float64ArrayConstructor,
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
 * Create a new matrix based on the size of the current one or by using specific dimensions.
 * @param options
 */
export function matrixCreateEmpty<
  ArrayConstructorType extends NumberArrayConstructor = Float64ArrayConstructor,
>(
  options: MatrixCreateEmptyOptions<ArrayConstructorType>,
): Array<NumberArrayType<ArrayConstructorType>> {
  const {
    matrix,
    nbRows = matrix?.length || 1,
    nbColumns = matrix?.[0].length || 1,
    ArrayConstructor = Float64Array as ArrayConstructorType,
  } = options;

  const newMatrix: Array<NumberArrayType<ArrayConstructorType>> = [];
  for (let row = 0; row < nbRows; row++) {
    newMatrix.push(createNumberArray(ArrayConstructor, nbColumns));
  }
  return newMatrix;
}
