import { DoubleMatrix, xMedian } from '..';

import { matrixToArray } from './matrixToArray';

/**
 * returns the median of the matrix
 */

export function matrixMedian(matrix: DoubleMatrix) {
  return xMedian(matrixToArray(matrix));
}
