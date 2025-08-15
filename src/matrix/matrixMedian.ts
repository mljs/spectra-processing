import type { DoubleMatrix } from '../types/index.ts';
import { xMedian } from '../x/index.ts';

import { matrixToArray } from './matrixToArray.ts';

/**
 * Returns the median of the matrix.
 * @param matrix
 */
export function matrixMedian(matrix: DoubleMatrix): number {
  return xMedian(matrixToArray(matrix));
}
