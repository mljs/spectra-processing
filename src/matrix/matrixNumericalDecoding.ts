import { matrixClone } from './matrixClone';

/**
 * Numerically decodes the matrix using the dictionnary
 * @param matrixInitial - original matrix before encoding
 * @param dictionnary - dictionary against which to do the encoding
 * @returns - decoded matrix
 */

function swap(dictionnary: Record<string, number>) {
  const ret: Record<number, string> = {};
  for (const key in dictionnary) {
    ret[Number(dictionnary[key])] = key;
  }
  return ret;
}

export function matrixNumericalDecoding(
  matrixInitial: number[][],
  dictionnary: Record<string, number>,
): Array<Array<string | number>> {
  const matrix = matrixClone(matrixInitial);
  const invertedDictionnary: Record<number, string> = swap(dictionnary);
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] in invertedDictionnary) {
        matrix[i][j] = invertedDictionnary[matrix[i][j]];
      }
    }
  }
  return matrix;
}
