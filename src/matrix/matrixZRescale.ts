import { DoubleMatrix } from '..';

import { matrixCreateEmpty } from './matrixCreateEmpty';
import { matrixMinMaxZ } from './matrixMinMaxZ';

/**
 * Rescale a matrix between min and max values
 *
 * @param matrix - matrix [rows][cols].
 * @param options - Options
 */
export function matrixZRescale(
  matrix: DoubleMatrix,
  options: {
    /**
     * min
     * @default 0
     * */
    min?: number;
    /**
     * max
     * @default 1
     * */
    max?: number;
    /**
     * Allows to specify the type of array to use
     */
    ArrayConstructor?: any;
  } = {},
): DoubleMatrix {
  const { min = 0, max = 1, ArrayConstructor } = options;
  const nbColumns = matrix[0].length;
  const nbRows = matrix.length;
  const newMatrix = matrixCreateEmpty({ nbColumns, nbRows, ArrayConstructor });

  const { min: currentMin, max: currentMax } = matrixMinMaxZ(matrix);
  const factor = (max - min) / (currentMax - currentMin);

  for (let column = 0; column < nbColumns; column++) {
    for (let row = 0; row < nbRows; row++) {
      newMatrix[row][column] =
        (matrix[row][column] - currentMin) * factor + min;
    }
  }
  return newMatrix;
}
