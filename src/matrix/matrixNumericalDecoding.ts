/**
 * Numerically decodes the matrix using the dictionnary
 * @param array - original matrix before encoding
 * @param dictionnary - dictionary against which to do the encoding
 * @returns - decoded matrix
 */

function swap(dictionnary: { [stringValue: string]: number }) {
  let ret: { [numberValue: number]: string } = {};
  for (let key in dictionnary) {
    ret[Number(dictionnary[key])] = key;
  }
  return ret;
}

export function matrixNumericalDecoding(
  matrix: (number | string)[][],
  dictionnary: { [stringValue: string]: number },
): (number | string)[][] {
  let invertedDictionnary: { [numberValue: number]: string } =
    swap(dictionnary);
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] in invertedDictionnary) {
        matrix[i][j] = invertedDictionnary[Number(matrix[i][j])];
      }
    }
  }
  return matrix;
}
