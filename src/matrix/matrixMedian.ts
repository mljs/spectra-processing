import quickSelectMedian from 'median-quickselect';

import { DoubleMatrix } from '..';

import { matrixFlatToFloat64 } from './matrixFlatToFloat64';

/**
 * returns the median of the matrix
 */

export function matrixMedian(matrix: DoubleMatrix) {
  return quickSelectMedian(matrixFlatToFloat64(matrix));
}
