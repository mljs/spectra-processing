import { matrixClone } from './matrixClone';

/**
 * Numerically encodes the strings in the matrix and returns an encoding dictionnary which can be used to encode other matrices
 * @param matrix - original matrix before encoding
 * @param dictCategoricalToNumerical - dictionnary for encoding
 * @returns - dictionnary from string to number
 */
export function matrixNumericalEncoding(
  matrixInitial: Array<Array<string | number>>,
): {
  matrix: number[][];
  dictCategoricalToNumerical: Record<string, number>;
} {
  const matrix = matrixClone(matrixInitial);
  const nRows = matrix.length;
  const nColumns = matrix[0].length;

  const dictCategoricalToNumerical: Record<string, number> = {};
  let k = 0;

  for (let i = 0; i < nRows; i++) {
    for (let j = 0; j < nColumns; j++) {
      if (typeof matrix[i][j] === 'number' && matrix[i][j] > k) {
        k = matrix[i][j];
      }
    }
  }

  for (let i = 0; i < nRows; i++) {
    for (let j = 0; j < nColumns; j++) {
      if (typeof matrix[i][j] === 'string') {
        if (matrix[i][j] in dictCategoricalToNumerical) {
          matrix[i][j] = dictCategoricalToNumerical[matrix[i][j]];
        } else {
          k++;
          dictCategoricalToNumerical[matrix[i][j]] = k;
          matrix[i][j] = k;
        }
      }
    }
  }
  return { matrix, dictCategoricalToNumerical };
}
