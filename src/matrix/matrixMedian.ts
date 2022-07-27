import { DoubleMatrix } from '..';
import { xMedian } from '../x/xMedian';

import { matrixCheck } from './matrixCheck';

/**
 * returns the median of the matrix
 */

export function matrixMedian(matrix: DoubleMatrix) {
  matrixCheck(matrix);

  const medians = new Float64Array(matrix.length);
  for (let i = 0; i < matrix.length; i++) {
    medians[i] = xMedian(matrix[i]);
  }

  return xMedian(medians);
}
