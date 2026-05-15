import type { DoubleArray, DoubleMatrix } from 'cheminfo-types';

export interface MatrixBoxPlot {
  /** First quartile for each column. */
  q1: Float64Array;
  /** Median for each column. */
  median: Float64Array;
  /** Third quartile for each column. */
  q3: Float64Array;
  /** Minimum value for each column (taken from the first row of the sorted matrix). */
  min: Float64Array;
  /** Maximum value for each column (taken from the last row of the sorted matrix). */
  max: Float64Array;
}

/**
 * Computes per-column box-plot statistics (min, Q1, median, Q3, max) for a matrix.
 * The matrix rows must be sorted in ascending order — results will be wrong otherwise.
 * Requires at least 5 rows.
 * @param matrix - 2D matrix whose rows are sorted in ascending order
 * @returns per-column box-plot statistics
 */
export function matrixBoxPlot(matrix: DoubleMatrix): MatrixBoxPlot {
  const nbRows = matrix.length;
  const nbColumns = matrix[0].length;
  if (nbRows < 5) {
    throw new Error(
      'can not calculate info if matrix contains less than 5 rows',
    );
  }

  const info: MatrixBoxPlot = {
    q1: new Float64Array(nbColumns),
    median: new Float64Array(nbColumns),
    q3: new Float64Array(nbColumns),
    min: Float64Array.from(matrix[0]),
    max: Float64Array.from(matrix.at(-1) as DoubleArray),
  };

  const columnArray = new Float64Array(matrix.length);

  for (let column = 0; column < nbColumns; column++) {
    for (let row = 0; row < nbRows; row++) {
      columnArray[row] = matrix[row][column];
    }
    let q1max = 0;
    let q3min = 0;
    if (nbRows % 2 === 1) {
      // odd
      const middle = (nbRows - 1) / 2;
      info.median[column] = columnArray[middle];
      q1max = middle - 1;
      q3min = middle + 1;
    } else {
      // even
      q3min = nbRows / 2;
      q1max = q3min - 1;
      info.median[column] = (columnArray[q1max] + columnArray[q3min]) / 2;
    }
    if (q1max % 2 === 0) {
      info.q1[column] = columnArray[q1max / 2];
      info.q3[column] = columnArray[(nbRows + q3min - 1) / 2];
    } else {
      info.q1[column] =
        (columnArray[(q1max + 1) / 2] + columnArray[(q1max - 1) / 2]) / 2;
      const middleOver = (columnArray.length + q3min) / 2;
      info.q3[column] =
        (columnArray[middleOver] + columnArray[middleOver - 1]) / 2;
    }
  }

  return info;
}
