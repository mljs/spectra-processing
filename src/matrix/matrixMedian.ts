import quickSelectMedian from 'median-quickselect';

import { DoubleMatrix } from '..';

import { matrixToArray } from './matrixToArray';

/**
 * returns the median of the matrix
 */

export function matrixMedian(matrix: DoubleMatrix) {
  return quickSelectMedian(matrixToArray(matrix));
}
