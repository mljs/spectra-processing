import { Matrix } from 'ml-matrix';

/**
 * Log 10 of each point.
 * @param {Matrix} [matrix] - matrix [rows][cols].
 * @return {Matrix} Normalized matrix
 */
export function log10Normalization(matrix) {
  const result = Matrix.checkMatrix(matrix);
  for (let i = 0; i < result.rows; i++) {
    for (let j = 0; j < result.columns; j++) {
      result.set(i, j, Math.log10(result.get(i, j)));
    }
  }
  return result;
}
