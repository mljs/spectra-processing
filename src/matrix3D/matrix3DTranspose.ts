import { getZArray } from './utils/getZArray';

/**
 * Transposes a 3D matrix so that the first and third dimensions are swapped.
 * The resulting matrix has the shape [nbColumns][nbRows][nTraces].
 * @param matrix3D - The 3D matrix to transpose.
 * @returns The transposed 3D matrix.
 */
export function matrix3DTranspose(matrix3D: number[][][]) {
  //assume that the matrix is rectangular
  const nTraces = matrix3D.length;
  const nbRows = matrix3D[0].length;
  const nbColumns = matrix3D[0][0].length;

  const newMatrix3D = [];
  for (let r = 0; r < nbRows; r++) {
    const newRows = [];
    for (let c = 0; c < nbColumns; c++) {
      newRows.push(getZArray(matrix3D, { r, c }));
    }
    newMatrix3D.push(newRows);
  }

  return newMatrix3D;
}
