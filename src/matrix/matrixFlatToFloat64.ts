import { DoubleMatrix } from '..';

import { matrixCheck } from './matrixCheck';

export function matrixFlatToFloat64(matrix: DoubleMatrix) {
  matrixCheck(matrix);

  const nbColumns = matrix[0].length;
  const flatten = new Float64Array(matrix.length * nbColumns);
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < nbColumns; c++) {
      flatten[r * nbColumns + c] = matrix[r][c];
    }
  }

  return flatten;
}
