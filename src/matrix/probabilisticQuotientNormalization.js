import mean from 'ml-array-mean';
import { Matrix } from 'ml-matrix';

/**
 * Performs a Probabilistic quotient normalization over the dataset to account dilution based in median spectrum.
 * Dieterle, F., Ross, A., Schlotterbeck, G., & Senn, H. (2006). Probabilistic quotient normalization as robust method to account for dilution of complex biological mixtures. Application in 1H NMR metabonomics. Analytical chemistry, 78(13), 4281-4290.
 * DOI: 10.1021/ac051632c
 * @param {Matrix} [matrix] - matrix [rows][cols].
 * @param {Object} [options={}]
 * @param {number} [options.max=100] - Normalization integral constant.
 * @return {Object} { data, averageQuotients }.
 * data: Normalized dataset.
 * averageQuotients: The quotients of all variables of interest.
 */
export function probabilisticQuotientNormalization(matrix, options = {}) {
  let { max = 100 } = options;
  matrix = new Matrix(matrix);
  for (let i = 0; i < matrix.rows; i++) {
    let row = matrix.getRowVector(i).div(matrix.getRowVector(i).norm() / max);
    matrix.setRow(i, row);
  }
  let normalizationFactor = matrix.norm() / max;
  matrix.div(normalizationFactor);
  let referenceSpectrum = [];
  for (let i = 0; i < matrix.columns; i++) {
    let currentVariable = [];
    for (let j = 0; j < matrix.rows; j++) {
      currentVariable.push(matrix.get(j, i));
    }
    referenceSpectrum.push(mean(currentVariable));
  }
  let averageQuotients = [];
  for (let i = 0; i < matrix.rows; i++) {
    let quotients = [];
    for (let j = 0; j < matrix.columns; j++) {
      let quotient = matrix.get(i, j) / referenceSpectrum[j];
      quotients.push(quotient);
    }
    averageQuotients.push(mean(quotients));
  }

  for (let i = 0; i < matrix.rows; i++) {
    matrix.mulRow(i, averageQuotients[i]);
  }
  return {
    data: matrix,
    averageQuotients: averageQuotients,
  };
}
