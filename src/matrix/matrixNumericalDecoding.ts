import { matrixClone } from './matrixClone';

/**
 * Numerically decodes the matrix using the dictionary.
 * @param matrixInitial
 * @param dictionary - dictionary against which to do the encoding
 * @returns - decoded matrix
 */
export function matrixNumericalDecoding(
  matrixInitial: number[][],
  dictionary: Record<string, number>,
): Array<Array<string | number>> {
  const matrix: Array<Array<string | number>> = matrixClone(matrixInitial);
  const invertedDictionary: Record<number, string> = swap(dictionary);
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      const value = matrix[i][j];
      if (typeof value === 'number' && value in invertedDictionary) {
        matrix[i][j] = invertedDictionary[value];
      }
    }
  }
  return matrix;
}

function swap(dictionary: Record<string, number>) {
  const ret: Record<number, string> = {};
  for (const key in dictionary) {
    ret[dictionary[key]] = key;
  }
  return ret;
}
