import type { NumberArrayConstructor } from '../utils/index.ts';

import { matrixCheck } from './matrixCheck.ts';
import { matrixCreateEmpty } from './matrixCreateEmpty.ts';

export interface MatrixTransposeOptions<
  ArrayConstructorType extends NumberArrayConstructor = Float64ArrayConstructor,
> {
  /**
   * Allows to specify the type of array to use
   * @default Float64Array
   */
  ArrayConstructor?: ArrayConstructorType;
}

export function matrixTranspose<
  ArrayConstructorType extends NumberArrayConstructor = Float64ArrayConstructor,
>(
  matrix: number[][],
  options: MatrixTransposeOptions<ArrayConstructorType> = {},
) {
  matrixCheck(matrix);
  const { ArrayConstructor } = options;
  const nbRows = matrix.length;
  const nbColumns = matrix[0].length;

  // Create new matrix with swapped dimensions
  const result = matrixCreateEmpty({
    nbColumns: nbRows,
    nbRows: nbColumns,
    ArrayConstructor,
  });

  for (let i = 0; i < nbRows; i++) {
    for (let j = 0; j < nbColumns; j++) {
      result[j][i] = matrix[i][j];
    }
  }

  return result;
}
