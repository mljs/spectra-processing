import { DataXY } from 'cheminfo-types';

import { DoubleMatrix, XHistogramOptions } from '..';
import { xHistogram } from '../x';

import { matrixMinMaxAbsoluteZ } from './matrixMinMaxAbsoluteZ';
import { matrixMinMaxZ } from './matrixMinMaxZ';

export interface MatrixHistogramOptions {
  /**
   * Center the X value. We will enlarge the first and
   * @default true
   */
  centerX?: boolean;

  /**
   * histogram
   */
  histogram?: DataXY;

  /**
   * Number of slots
   * @default 256
   */
  nbSlots?: number;

  /**
   * We can first apply a log on the x-axis.
   */
  logBaseX?: number;

  /**
   * We can apply a log on the resulting histogram
   */
  logBaseY?: number;

  /**
   * Take the absolute value
   */
  absolute?: boolean;

  /**
   * Maximal value to calculate used to calculate slot size
   * @default maxValue
   */
  max?: number;

  /**
   * Minimum value to calculate used to calculate slot size
   * @default minValue
   */
  min?: number;
}

/**
 * Calculates a histogram of defined number of slots.
 * @param matrix - matrix [rows][cols].
 * @param options - options
 * @returns - Result of the histogram.
 */
export function matrixHistogram(
  matrix: DoubleMatrix,
  options: MatrixHistogramOptions = {},
): DataXY {
  let { min, max } = options;
  const { absolute, logBaseX, logBaseY, histogram, nbSlots, centerX } = options;

  if (matrix.length === 0 || matrix[0].length === 0) {
    throw new Error('matrix must have at least one column and one row');
  }

  if (min === undefined || max === undefined) {
    const minMax = absolute
      ? matrixMinMaxAbsoluteZ(matrix)
      : matrixMinMaxZ(matrix);
    if (min === undefined) {
      min =
        logBaseX && minMax.min
          ? Math.log(minMax.min) / Math.log(logBaseX)
          : minMax.min;
    }
    if (max === undefined) {
      max =
        logBaseX && minMax.max
          ? Math.log(minMax.max) / Math.log(logBaseX)
          : minMax.max;
    }
  }

  const xHistogramOptions: XHistogramOptions = {
    histogram,
    nbSlots,
    centerX,
    absolute,
    logBaseX,
    // Skip logBaseY as it's handled below.
    min,
    max,
  };
  const finalHistogram = xHistogram(matrix[0], xHistogramOptions);
  xHistogramOptions.histogram = finalHistogram;

  const nbRows = matrix.length;
  for (let row = 1; row < nbRows; row++) {
    xHistogram(matrix[row], xHistogramOptions);
  }

  const y = finalHistogram.y;
  if (logBaseY) {
    const logOfBase = Math.log10(logBaseY);
    for (let i = 0; i < y.length; i++) {
      y[i] = Math.log10(y[i] + 1) / logOfBase;
    }
  }

  return finalHistogram;
}
