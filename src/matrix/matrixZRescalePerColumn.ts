import { DoubleMatrix } from '../types';

import { matrixCreateEmpty } from './matrixCreateEmpty';

export interface MatrixZRescalePerColumnOptions {
  /**
   * min
   * @default 0
   */
  min?: number;

  /**
   * max
   * @default 1
   */
  max?: number;
}

/**
 * Rescale the matrix per column for which we get the min and max values.
 * @param matrix - matrix [rows][cols].
 * @param options - Options.
 */
export function matrixZRescalePerColumn(
  matrix: DoubleMatrix,
  options: MatrixZRescalePerColumnOptions = {},
): Float64Array[] {
  const { min = 0, max = 1 } = options;
  const nbColumns = matrix[0].length;
  const nbRows = matrix.length;
  const newMatrix = matrixCreateEmpty({ nbColumns, nbRows });
  for (let column = 0; column < nbColumns; column++) {
    let currentMin = matrix[0][column];
    let currentMax = matrix[0][column];
    for (let row = 1; row < nbRows; row++) {
      if (matrix[row][column] < currentMin) currentMin = matrix[row][column];
      if (matrix[row][column] > currentMax) currentMax = matrix[row][column];
    }

    const factor = (max - min) / (currentMax - currentMin);

    for (let row = 0; row < nbRows; row++) {
      newMatrix[row][column] =
        (matrix[row][column] - currentMin) * factor + min;
    }
  }
  return newMatrix;
}
