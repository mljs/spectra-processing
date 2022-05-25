import { DoubleArray } from 'cheminfo-types';
import Matrix from 'ml-matrix';
import { xSubtract } from './xSubtract';

const absDiff = (a: number, b: number) => Math.abs(a - b);

interface xCostMatrixOptions {
  fct?: (a: number, b: number) => number;
}

export function xCostMatrix(
  array1: DoubleArray,
  array2: DoubleArray,
  options: xCostMatrixOptions = {},
) {
  const { fct = absDiff } = options;

  const nbRows = array1.length;
  const nbColumns = array2.length;

  const result = new Matrix(nbRows, nbColumns);
  for (let r = 0; r < nbRows; r++) {
    for (let c = 0; c < nbColumns; c++) {
      result.set(r, c, fct(array1[r], array2[c]));
    }
  }
  return result;
}
