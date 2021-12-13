import { DataXY } from 'cheminfo-types';

import { DoubleMatrix } from '..';
import { xHistogram } from '../x/xHistogram';

import { matrixMinMaxAbsoluteZ } from './matrixMinMaxAbsoluteZ';
import { matrixMinMaxZ } from './matrixMinMaxZ';

/**
 * Calculates an histogram of defined number of slots
 *
 * @param [matrix] - matrix [rows][cols].
 * @param options options
 * @param [options.nbSlots=256] Number of slots
 * @param [options.min=minValue] Minimum value to calculate used to calculate slot size
 * @param [options.max=maxValue] Maximal value to calculate used to calculate slot size
 * @param [options.logBaseX] We can first apply a log on x axi
 * @param [options.logBaseY] We can apply a log on the resulting histogra
 * @param [options.absolute] Take the absolute value
 * @param [options.centerX=true] Center the X value. We will enlarge the first and
 * @param options.histogram histogram
 * @returns of the histogram
 */
export function matrixHistogram(
  matrix: DoubleMatrix,
  options: {
    centerX?: boolean;
    histogram?: DataXY;
    nbSlots?: number;
    logBaseX?: number;
    logBaseY?: number;
    absolute?: boolean;
    max?: number;
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
      options.min = logBaseX
        ? Math.log(minMax.min as number) / Math.log(logBaseX)
        : minMax.min;
    }
    if (options.max === undefined) {
      options.max = logBaseX
        ? Math.log(minMax.max as number) / Math.log(logBaseX)
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
