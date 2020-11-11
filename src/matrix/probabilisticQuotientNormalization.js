import { Matrix } from 'ml-matrix';

/**
 * Performs a Probabilistic quotient normalization over the dataset to account dilution based in median spectrum.
 * Dieterle, F., Ross, A., Schlotterbeck, G., & Senn, H. (2006). Probabilistic quotient normalization as robust method to account for dilution of complex biological mixtures. Application in 1H NMR metabonomics. Analytical chemistry, 78(13), 4281-4290.
 * DOI: 10.1021/ac051632c
 * @param {Matrix} [dataset] - matrix [rows][cols].
 * @param {number} [options.max] - Normalization integral constant.
 * @return {Object} { data, averageQuotients }.
 * data: Normalized dataset.
 * averageQuotients: The quotients of all variables of interest.
 */
export function probabilisticQuotientNormalization(dataset, options = {}) {
  let { max = 100 } = options;
  let matrixDataset = Matrix.checkMatrix(dataset.clone());
  for (let i = 0; i < matrixDataset.rows; i++) {
    let row = matrixDataset
      .getRowVector(i)
      .div(matrixDataset.getRowVector(i).norm() / max);
    matrixDataset.setRow(i, row);
  }
  let normalizationFactor = matrixDataset.norm() / max;
  matrixDataset.div(normalizationFactor);
  let referenceSpectrum = [];
  let nbSamples = matrixDataset.rows;
  for (let i = 0; i < matrixDataset.columns; i++) {
    let currentVariable = [];
    for (let j = 0; j < matrixDataset.rows; j++) {
      currentVariable.push(matrixDataset.get(j, i));
    }
    referenceSpectrum.push(
      currentVariable.reduce((prev, current) => prev + current) / nbSamples,
    );
  }
  let averageQuotients = [];
  let nbVariables = matrixDataset.columns;
  for (let i = 0; i < matrixDataset.rows; i++) {
    let quotients = [];
    for (let j = 0; j < matrixDataset.columns; j++) {
      let quotient = matrixDataset.get(i, j) / referenceSpectrum[j];
      quotients.push(quotient);
    }
    averageQuotients.push(
      quotients.reduce((prev, current) => prev + current) / nbVariables,
    );
  }

  for (let i = 0; i < matrixDataset.rows; i++) {
    matrixDataset.mulRow(i, averageQuotients[i]);
  }
  return {
    data: matrixDataset,
    averageQuotients: averageQuotients,
  };
}
