import type { NumberArray } from 'cheminfo-types';

/**
 * Updates the given system matrix (lD'D) in the triplet form and y data with the provided weights.
 * It simulates the matrix operation and W + lD'D
 * @param matrix - The original system matrix to be updated, a lower triangular non-zeros of the system matrix (lambda D'D).
 * @param y - The original vector to be updated.
 * @param weights - The weights to apply to the system matrix and vector.
 * @returns A tuple containing the updated system matrix and vector.
 */
export function addWeights(
  matrix: number[][],
  y: NumberArray,
  weights: NumberArray,
): [number[][], Float64Array] {
  const nbPoints = y.length;
  const l = nbPoints - 1;
  const newMatrix: number[][] = new Array(matrix.length);
  const newVector: Float64Array = new Float64Array(nbPoints);
  for (let i = 0; i < l; i++) {
    const w = weights[i];
    const diag = i * 2;
    const next = diag + 1;
    newMatrix[diag] = matrix[diag].slice();
    newMatrix[next] = matrix[next].slice();
    if (w === 0) {
      newVector[i] = 0;
    } else {
      newVector[i] = y[i] * w;
      newMatrix[diag][2] += w;
    }
  }
  newVector[l] = y[l] * weights[l];
  newMatrix[l * 2] = matrix[l * 2].slice();
  newMatrix[l * 2][2] += weights[l];

  return [newMatrix, newVector];
}
