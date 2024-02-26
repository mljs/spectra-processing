import { xMaxValue } from '../x';

import { matrixCreateEmpty } from './matrixCreateEmpty';

/**
 * Numerically encodes the strings in the matrix with an encoding dictionary.
 * @param matrixInitial - Original matrix before encoding.
 * @param dictionary - Dictionary against which to do the encoding.
 * @returns - Encoded matrix.
 */
export function matrixApplyNumericalEncoding(
  matrixInitial: Array<Array<string | number>>,
  dictionary: Record<string, number>,
): number[][] {
  const matrix = matrixCreateEmpty({
    nbRows: matrixInitial.length,
    nbColumns: matrixInitial[0].length,
    ArrayConstructor: Array,
  });

  const arrayOfValues: number[] = [];
  for (const key in dictionary) {
    arrayOfValues.push(dictionary[key]);
  }

  let k = xMaxValue(arrayOfValues);
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (typeof matrix[i][j] === 'string') {
        if (matrix[i][j] in dictionary) {
          matrix[i][j] = dictionary[matrix[i][j]];
        } else {
          k++;
          dictionary[matrix[i][j]] = k;
          matrix[i][j] = k;
        }
      }
    }
  }

  return matrix;
}
