import { matrixClone } from './matrixClone';

/**
 * Numerically encodes the strings in the matrix and returns an encoding dictionary which can be used to encode other matrices
 * @param matrixInitial - original matrix before encoding
 * @returns - dictionary from string to number
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

  let k = 0;
  for (let i = 0; i < nRows; i++) {
    for (let j = 0; j < nColumns; j++) {
      const value = matrix[i][j];
      if (typeof value === 'number' && value > k) {
        k = value;
      }
    }
  }

  const dictCategoricalToNumerical: Record<string, number> = {};
  for (let i = 0; i < nRows; i++) {
    for (let j = 0; j < nColumns; j++) {
      const value = matrix[i][j];
      if (typeof value === 'string') {
        if (value in dictCategoricalToNumerical) {
          matrix[i][j] = dictCategoricalToNumerical[value];
        } else {
          k++;
          dictCategoricalToNumerical[value] = k;
          matrix[i][j] = k;
        }
      }
    }
  }
  return { matrix: matrix as number[][], dictCategoricalToNumerical };
}
