import { DoubleMatrix } from '..';

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
  } = {},
): DoubleMatrix {
  const { min = 0, max = 1 } = options;
  const nbRows = matrix.length;
  const nbColumns = matrix[0].length;
  const newMatrix = new Array(nbRows);
  for (let row = 0; row < nbRows; row++) {
    newMatrix[row] = new Float64Array(nbColumns);
  }

  const { min: currentMin, max: currentMax } = matrixMinMaxZ(matrix);

  for (let column = 0; column < nbColumns; column++) {
    const factor = (max - min) / (currentMax - currentMin);

    for (let row = 0; row < nbRows; row++) {
      newMatrix[row][column] =
        (matrix[row][column] - currentMin) * factor + min;
    }
  }
  return newMatrix;
}
