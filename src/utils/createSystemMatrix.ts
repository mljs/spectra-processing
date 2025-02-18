import { matrixCuthillMckee } from '../matrix/matrixCuthillMckee';

/**
 * Generates a lower triangular non-zeros of the first order smoother matrix (lambda D'D) where D is the derivate of the identity matrix
 * this function in combination with addWeights function can obtain (Q = W + lambda D'D) a penalized least square of Whitaker smoother,
 * it also generates a permutation encoded array.
 * @param dimension - The number of points in the matrix.
 * @param lambda - The factor of smoothness .
 * @returns An object containing the lower triangular non-zero elements of the matrix
 * and the permutation encoded array.
 * @property lowerTriangularNonZeros - The lower triangular non-zero elements of the matrix in triplet form.
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
