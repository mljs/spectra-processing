import { Matrix } from 'ml-matrix';

import { DoubleMatrix } from '../types';
import { xMedian } from '../x';

export interface MatrixPQNOptions {
  /**
   * Normalization integral constant.
   * @default 100
   */
  max?: number;

  /**
   * min
   */
  min?: number;
}

/**
 * Performs a Probabilistic quotient normalization (PQN) over the dataset to account dilution based in median spectrum.
 * Dieterle, F., Ross, A., Schlotterbeck, G., & Senn, H. (2006). Probabilistic quotient normalization as robust method to account for dilution of complex biological mixtures. Application in 1H NMR metabonomics. Analytical chemistry, 78(13), 4281-4290.
 * DOI: 10.1021/ac051632c
 * @param matrix - matrix [rows][cols].
 * @param options - options
 * @returns - {data: Normalized dataset, medianOfQuotients: The median of quotients of each variables}
 */
export function matrixPQN(
  matrix: DoubleMatrix,
  options: MatrixPQNOptions = {},
): {
  data: number[][];
  medianOfQuotients: number[];
} {
  const { max = 100 } = options;
  const matrixB = new Matrix(matrix as number[][]);
  for (let i = 0; i < matrixB.rows; i++) {
    const normalizationFactor = matrixB.getRowVector(i).norm('frobenius') / max;
    const row = matrixB.getRowVector(i).div(normalizationFactor);
    matrixB.setRow(i, row);
  }

  const referenceSpectrum: number[] = [];
  for (let i = 0; i < matrixB.columns; i++) {
    const currentVariable = matrixB.getColumn(i);
    referenceSpectrum.push(xMedian(currentVariable));
  }

  const medianOfQuotients: number[] = [];
  for (let i = 0; i < matrixB.columns; i++) {
    const quotients = matrixB.getColumnVector(i).div(referenceSpectrum[i]);
    medianOfQuotients.push(xMedian(quotients.getColumn(0)));
  }

  for (let i = 0; i < matrixB.rows; i++) {
    matrixB.mulRow(i, 1 / medianOfQuotients[i]);
  }

  return {
    data: matrixB.to2DArray(),
    medianOfQuotients,
  };
}
