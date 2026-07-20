import { xMaxValue } from '../x/index.ts';

import { matrixClone } from './matrixClone.ts';

/**
 * Numerically encodes the strings in the matrix with an encoding dictionary.
 * @param matrixInitial - original matrix before encoding.
 * @param dictionary - dictionary against which to do the encoding.
 * @returns encoded matrix.
 */
export function matrixApplyNumericalEncoding(
  matrixInitial: Array<Array<string | number>>,
  dictionary: Record<string, number>,
): number[][] {
  const matrix = matrixClone(matrixInitial);

  const arrayOfValues: number[] = [];
  for (const key in dictionary) {
    arrayOfValues.push(dictionary[key]);
  }

  let k = xMaxValue(arrayOfValues);
  for (const row of matrix) {
    for (let j = 0; j < row.length; j++) {
      const value = row[j];
      if (typeof value === 'string') {
        if (value in dictionary) {
          row[j] = dictionary[value];
        } else {
          k++;
          dictionary[value] = k;
          row[j] = k;
        }
      }
    }
  }

  return matrix as number[][];
}
