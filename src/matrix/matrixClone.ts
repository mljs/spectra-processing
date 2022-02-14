/**
 * Clone the matrix
 */
export function matrixClone(matrix: any[]): any[] {
  return matrix.map((row) => row.slice(0));
}
