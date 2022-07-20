import { DoubleMatrix } from '..';

import { matrixCreateEmpty } from './matrixCreateEmpty';
import { matrixMaxAbsoluteZ } from './matrixMaxAbsoluteZ';

/**
 * Rescale a matrix around 0 taking into account the absolute max value
 *
 * @param matrix - matrix [rows][cols].
 * @param options - Options
 */
export function matrixZPivotRescale(
  matrix: DoubleMatrix,
  options: {
    /**
     * max
     * @default 1
     * */
    max?: number;
  } = {},
): DoubleMatrix {
  const { max = 1 } = options;
  const nbColumns = matrix[0].length;
  const nbRows = matrix.length;
  const newMatrix = matrixCreateEmpty({ nbColumns, nbRows });

  const currentMax = matrixMaxAbsoluteZ(matrix);

  for (let column = 0; column < nbColumns; column++) {
    const factor = max / currentMax;

    for (let row = 0; row < nbRows; row++) {
      newMatrix[row][column] = matrix[row][column] * factor;
    }
  }
  return newMatrix;
}
