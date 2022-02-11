import { DataXY } from 'cheminfo-types';

import { DoubleMatrix } from '..';
import { xHistogram } from '../x/xHistogram';

import { matrixMinMaxAbsoluteZ } from './matrixMinMaxAbsoluteZ';
import { matrixMinMaxZ } from './matrixMinMaxZ';

/**
 * Calculates an histogram of defined number of slots
 *
 * @param matrix - matrix [rows][cols].
 * @param options - options
 * @returns - result of the histogram
 */
export function matrixHistogram(
  matrix: DoubleMatrix,
  options: {
    /**
     * Center the X value. We will enlarge the first and
     * @default true
     * */
    centerX?: boolean;
    /**
     * histogram
     * */
    histogram?: DataXY;
    /**
     * Number of slots
     * @default 256
     * */
    nbSlots?: number;
    /**
     * We can first apply a log on x axis
     * */
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
     * */
    max?: number;
    /**
     * Minimum value to calculate used to calculate slot size
     * @default minValue
     * */
    min?: number;
  } = {},
): DataXY {
  const { logBaseY, logBaseX, absolute } = options;
  options = JSON.parse(JSON.stringify(options));
  delete options.logBaseY;
  if (matrix.length === 0 || matrix[0].length === 0) {
    throw new Error(
      'matrixHistogram: matrix should have at least one column and one row',
    );
  }

  if (options.min === undefined || options.max === undefined) {
    const minMax: { min?: number; max?: number } = absolute
      ? matrixMinMaxAbsoluteZ(matrix)
      : matrixMinMaxZ(matrix);
    if (options.min === undefined) {
      options.min =
        logBaseX && minMax.min
          ? Math.log(minMax.min) / Math.log(logBaseX)
          : minMax.min;
    }
    if (options.max === undefined) {
      options.max =
        logBaseX && minMax.max
          ? Math.log(minMax.max) / Math.log(logBaseX)
          : minMax.max;
    }
  }

  let histogram = xHistogram(matrix[0], options);
  options.histogram = histogram;

  const nbRows = matrix.length;
  for (let row = 1; row < nbRows; row++) {
    xHistogram(matrix[row], options);
  }

  const y = histogram.y;
  if (logBaseY) {
    const logOfBase = Math.log10(logBaseY);
    for (let i = 0; i < y.length; i++) {
      y[i] = Math.log10(y[i] + 1) / logOfBase;
    }
  }

  return histogram;
}
