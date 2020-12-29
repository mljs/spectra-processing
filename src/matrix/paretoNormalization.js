import { Matrix } from 'ml-matrix';

/**
 * Pareto scaling, which uses the square root of standard deviation as the scaling factor, circumvents the amplification of noise by retaining a small portion of magnitude information.
 * Noda, I. (2008). Scaling techniques to enhance two-dimensional correlation spectra. Journal of Molecular Structure, 883, 216-227.
 * DOI: 10.1016/j.molstruc.2007.12.026
 * @param {Matrix} [matrix] - matrix [rows][cols].
 * @return {Matrix} Normalized matrix
 */
export function paretoNormalization(matrix) {
  const result = Matrix.checkMatrix(matrix);
  const stdByRow = result.standardDeviation('row');
  for (let i = 0; i < result.rows; i++) {
    result.mulRow(i, 1 / Math.sqrt(stdByRow[i]));
  }
  return result;
}
