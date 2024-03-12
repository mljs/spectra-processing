import { NumberArray } from 'cheminfo-types';
import { Matrix } from 'ml-matrix';

const absDiff = (a: number, b: number) => Math.abs(a - b);

interface XCostMatrixOptions {
  /**
   * function to generate the elements of a cost matrix. The first argunment come from rowsArray input and the second argument come from columnsArray input.
   */
  fct?: (a: number, b: number) => number;
}

/**
 * Generate a cost matrix from two set of values using the function passed. by default it
 * generate the cost matrix of absolute value of differences.
 * @param rowsArray - Array of values that will represent the rows of the cost matrix.
 * @param columnsArray - Array of values that will represent the columns of the cost matrix.
 * @param options
 * @returns - A matrix instance with dimensions rowsArray.length x columnsArray.length
 */
export function xCostMatrix(
  rowsArray: NumberArray,
  columnsArray: NumberArray,
  options: XCostMatrixOptions = {},
): Matrix {
  const { fct = absDiff } = options;

  const nbRows = rowsArray.length;
  const nbColumns = columnsArray.length;

  const result = new Matrix(nbRows, nbColumns);
  for (let r = 0; r < nbRows; r++) {
    for (let c = 0; c < nbColumns; c++) {
      result.set(r, c, fct(rowsArray[r], columnsArray[c]));
    }
  }
  return result;
}
