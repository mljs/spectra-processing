import { matrixClone } from './matrixClone';

/**
 * Numerically encodes the strings in the matrix and returns an encoding dictionnary which can be used to encode other matrices
 * @param matrix - original matrix before encoding
 * @param dictCategoricalToNumerical - dictionnary for encoding
 * @returns - dictionnary from string to number
 */
export function matrixNumericalEncoding(matrixInitial: (string | number)[][]): {
  matrix: number[][];
  dictCategoricalToNumerical: { [stringValue: string]: number };
} {
  let matrix = matrixClone(matrixInitial);
  let nRows = matrix.length;
  let nColumns = matrix[0].length;

  let dictCategoricalToNumerical: { [stringValue: string]: number } = {};
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
