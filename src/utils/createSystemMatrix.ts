import { matrixCuthillMckee } from '../matrix/matrixCuthillMckee';

/**
 * Generates a lower triangular non-zeros of the system matrix (lambda D'D), and its permutation encoded array.
 * D is the derivative of the identity matrix
 * @param dimension - The number of points in the matrix.
 * @param lambda - The lambda value used to calculate the matrix elements.
 * @returns An object containing the lower triangular non-zero elements of the matrix
 * and the permutation encoded array.
 * @property lowerTriangularNonZeros - The lower triangular non-zero elements of the matrix.
 * @property permutationEncodedArray - The permutation encoded array generated using the Cuthill-McKee algorithm.
 */
export function createSystemMatrix(
  dimension: number,
  lambda: number,
): {
  lowerTriangularNonZeros: number[][];
  permutationEncodedArray: Float64Array;
} {
  const matrix: number[][] = [];
  const last = dimension - 1;
  for (let i = 0; i < last; i++) {
    matrix.push([i, i, lambda * 2], [i + 1, i, -1 * lambda]);
  }
  matrix[0][2] = lambda;
  matrix.push([last, last, lambda]);
  return {
    lowerTriangularNonZeros: matrix,
    permutationEncodedArray: matrixCuthillMckee(matrix, dimension),
  };
}
