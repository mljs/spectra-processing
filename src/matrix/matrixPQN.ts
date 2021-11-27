import { DoubleArray } from 'cheminfo-types';
import median from 'ml-array-median';
import { Matrix } from 'ml-matrix';

/**
 * Performs a Probabilistic quotient normalization (PQN) over the dataset to account dilution based in median spectrum.
 * Dieterle, F., Ross, A., Schlotterbeck, G., & Senn, H. (2006). Probabilistic quotient normalization as robust method to account for dilution of complex biological mixtures. Application in 1H NMR metabonomics. Analytical chemistry, 78(13), 4281-4290.
 * DOI: 10.1021/ac051632c
 *
 * @param [matrix] - matrix [rows][cols].
 * @param [options={}] Options
 * @param [options.max=100] - Normalization integral constant.
 * @param options.min min
 * @returns result
 * data: Normalized dataset.
 * medianOfQuotients: The median of quotients of each variables.
 */
export function matrixPQN(
  matrix: DoubleArray[],
  options: { max?: number; min?: number } = {},
): {
  data: DoubleArray[];
  medianOfQuotients: DoubleArray;
} {
  const { max = 100 } = options;
  let matrixB = new Matrix(matrix as number[][]);
  for (let i = 0; i < matrixB.rows; i++) {
    const normalizationFactor = matrixB.getRowVector(i).norm('frobenius') / max;
    const row = matrixB.getRowVector(i).div(normalizationFactor);
    matrixB.setRow(i, row);
  }

  let referenceSpectrum = [];
  for (let i = 0; i < matrixB.columns; i++) {
    const currentVariable = matrixB.getColumn(i);
    referenceSpectrum.push(median(currentVariable));
  }

  let medianOfQuotients = [];
  for (let i = 0; i < matrixB.columns; i++) {
    let quotients = matrixB.getColumnVector(i).div(referenceSpectrum[i]);
    medianOfQuotients.push(median(quotients.getColumn(0)));
  }

  for (let i = 0; i < matrixB.rows; i++) {
    matrixB.mulRow(i, 1 / medianOfQuotients[i]);
  }

  return {
    data: matrixB.to2DArray(),
    medianOfQuotients: medianOfQuotients,
  };
}
