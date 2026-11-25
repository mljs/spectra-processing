import type { DoubleMatrix } from 'cheminfo-types';

/**
 * Checks whether all the values of a matrix are zero.
 * The check stops at the first value that is not zero, and `-0` is considered
 * a zero.
 * @param matrix - matrix to check.
 * @returns true if every value is zero (a matrix without values is considered
 * all zero), false as soon as one value is not zero.
 */
export function matrixIsZero(matrix: DoubleMatrix): boolean {
  for (const row of matrix) {
    for (let column = 0; column < row.length; column++) {
      if (row[column] !== 0) return false;
    }
  }
  return true;
}
