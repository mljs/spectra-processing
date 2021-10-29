/**
 * Get min and max of the absolute values of Z
 *
 * @param {Array<Array<number>>} [matrix] - matrix [rows][cols].
 * @returns {{ max?: number; min?: number }} results
 */
export function matrixMinMaxAbsoluteZ(
  matrix: Float64Array[] | number[][] | Float32Array[],
): { min?: number; max?: number } {
  if (matrix.length === 0 || matrix[0].length === 0) {
    return { min: undefined, max: undefined };
  }
  const nbRows = matrix.length;
  const nbColumns = matrix[0].length;

  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;

  for (let column = 0; column < nbColumns; column++) {
    for (let row = 0; row < nbRows; row++) {
      let value = matrix[row][column];
      if (value < 0) value *= -1;
      if (value < min) min = value;
      if (value > max) max = value;
    }
  }

  return { min, max };
}