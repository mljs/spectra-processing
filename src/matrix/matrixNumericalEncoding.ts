/**
 * Numerically encodes the strings in the matrix and returns an encoding dictionnary which can be used to encode other matrices
 * @param matrix - original matrix before encoding
 * @returns - dictionnary from string to number
 */
export function matrixNumericalEncoding(matrix: (string | number)[][]) {
  let nRows = matrix.length;
  let nColumns = matrix[0].length;

  let dictCategoricalToNumerical: { [nameString: string]: number } = {};
  let k = 0;

  for (let i = 0; i < nRows; i++) {
    for (let j = 0; j < nColumns; j++) {
      if (typeof matrix[i][j] === 'number' && matrix[i][j] > k) {
        k = Number(matrix[i][j]);
      }
    }
  }

  k++;

  for (let i = 0; i < nRows; i++) {
    for (let j = 0; j < nColumns; j++) {
      if (typeof matrix[i][j] === 'string') {
        if (matrix[i][j] in dictCategoricalToNumerical) {
          matrix[i][j] = dictCategoricalToNumerical[matrix[i][j]];
        } else {
          dictCategoricalToNumerical[matrix[i][j]] = k;
          matrix[i][j] = k++;
        }
      }
    }
  }
  return dictCategoricalToNumerical;
}
