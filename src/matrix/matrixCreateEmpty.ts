import type { DoubleMatrix } from 'cheminfo-types';

import type {
  NumberArrayConstructor,
  NumberArrayType,
} from '../utils/index.ts';
import { createNumberArray } from '../utils/index.ts';

export interface MatrixCreateEmptyOptions<
  ArrayConstructorType extends NumberArrayConstructor = Float64ArrayConstructor,
> {
  /**
   * Reference matrix used to derive default row and column counts.
   */
  matrix?: DoubleMatrix;

  /**
   * Number of rows in the new matrix.
   * @default matrix.length || 1
   */
  nbRows?: number;

  /**
   * Number of columns in the new matrix.
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
 * @param options - options.
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
