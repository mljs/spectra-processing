/**
 * Clone a matrix.
 * @param matrix
 */
export function matrixClone<ValueType>(matrix: ValueType[][]): ValueType[][] {
  return matrix.map((row) => row.slice(0));
}
