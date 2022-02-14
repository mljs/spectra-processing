import { xMaxValue } from '../x/xMaxValue';

import { matrixClone } from './matrixClone';

/**
 * Numerically encodes the strings in the matrix with an encoding dictionary
 * @param matrixInitial - original matrix before encoding
 * @param dictionnary - dictionary against which to do the encoding
 * @returns - encoded matrix
 */
export function matrixApplyNumericalEncoding(
  matrixInitial: (string | number)[][],
  dictionnary: { [nameString: string]: number },
): number[][] {
  let matrix = matrixClone(matrixInitial);
  let arrayOfValues = [];
  for (let key in dictionnary) {
    arrayOfValues.push(dictionnary[key]);
  }
  let k = xMaxValue(arrayOfValues);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (typeof matrix[i][j] === 'string') {
        if (matrix[i][j] in dictionnary) {
          matrix[i][j] = dictionnary[matrix[i][j]];
        } else {
          k++;
          dictionnary[matrix[i][j]] = k;
          matrix[i][j] = k;
        }
      }
    }
  }
  return matrix;
}
