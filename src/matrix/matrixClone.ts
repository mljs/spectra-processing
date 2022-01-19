/**
 * Creates a clone of a matrix
 * @param options - Options
 * @param options.from - from
 * @param options.to - to
 * @param options.length - length
 * @returns - array of floats
 */
export function matrixClone(matrix: any[]): any[] {
  return matrix.map((row) => row.slice(0));
}
