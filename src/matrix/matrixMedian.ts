import { DoubleMatrix } from '../types';
import { xMedian } from '../x';

import { matrixToArray } from './matrixToArray';

/**
 * Returns the median of the matrix.
 * @param matrix
 */
export function matrixMedian(matrix: DoubleMatrix): number {
  return xMedian(matrixToArray(matrix));
}
