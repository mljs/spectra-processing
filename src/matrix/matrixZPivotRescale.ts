import { NumberArray } from 'cheminfo-types';

import { NumberArrayConstructor, NumberArrayType } from '../utils';

import { matrixCreateEmpty } from './matrixCreateEmpty';
import { matrixMaxAbsoluteZ } from './matrixMaxAbsoluteZ';

export interface MatrixZPivotRescaleOptions<
  ArrayConstructorType extends NumberArrayConstructor = Float64ArrayConstructor,
> {
  /**
   * max
   * @default 1
   */
  max?: number;

  /**
   * Allows to specify the type of array to use
   * @default Float64Array
   */
  ArrayConstructor?: ArrayConstructorType;
}

/**
 * Rescale a matrix around 0 taking into account the absolute max value.
 * @param matrix - matrix [rows][cols].
 * @param options - Options.
 */
export function matrixZPivotRescale<
  ArrayConstructorType extends NumberArrayConstructor = Float64ArrayConstructor,
>(
  matrix: NumberArray[],
  options: MatrixZPivotRescaleOptions<ArrayConstructorType> = {},
): Array<NumberArrayType<NumberArrayConstructor>> {
  const { max = 1, ArrayConstructor } = options;
  const nbColumns = matrix[0].length;
  const nbRows = matrix.length;
  const newMatrix = matrixCreateEmpty({ nbColumns, nbRows, ArrayConstructor });

  const currentMax = matrixMaxAbsoluteZ(matrix);

  for (let column = 0; column < nbColumns; column++) {
    const factor = max / currentMax;

    for (let row = 0; row < nbRows; row++) {
      newMatrix[row][column] = matrix[row][column] * factor;
    }
  }
  return newMatrix;
}
