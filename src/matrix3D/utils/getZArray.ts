/**
 * Extracts a 1D array (z-axis) from a 3D matrix at the specified row and column indices.
 * @param matrix3D - The 3D matrix to extract from.
 * @param index - The coordinates {c, r} specifying the column and row.
 * @param index.c
 * @param index.r
 * @returns A Float64Array containing the values along the z-axis at the given row and column.
 */
export function getZArray(matrix3D: number[][][], index: {c: number, r: number}) {
  const nTraces = matrix3D.length;
  const nbRows = matrix3D[0].length;
  const nbColumns = matrix3D[0][0].length;

  const { c, r } = index;
  const nRow = new Float64Array(nTraces);
  for (let n = 0; n < nTraces; n++) {
    nRow[n] = matrix3D[n][r][c];
  }
  return nRow;
}