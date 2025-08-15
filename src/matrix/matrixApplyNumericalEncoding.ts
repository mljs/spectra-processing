import { xMaxValue } from '../x/index.ts';

import { matrixCreateEmpty } from './matrixCreateEmpty.ts';

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
  for (const row of matrix) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (typeof row[j] === 'string') {
        if (row[j] in dictionary) {
          row[j] = dictionary[row[j]];
        } else {
          k++;
          dictionary[row[j]] = k;
          row[j] = k;
        }
      }
    }
  }

  return matrix;
}
