import type { NumberArray } from 'cheminfo-types';

import { xCheck } from './xCheck';

export interface XBoxPlotOptions {
  /**
   * By default, there should be at least 5 elements.
   * @default false
   */
  allowSmallArray?: boolean;
}

export interface XBoxPlot {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
}

/**
 * Calculating the box plot of the array
 * This function will interpolate the values and use the inclusive algorithm
 * @param array - data
 * @param options
 * @returns - q1, median, q3, min, max
 */
export function xBoxPlot(array: NumberArray): XBoxPlot {
  xCheck(array);

  // duplicate the array to avoid modifying the original one
  // and sort typed array that is much faster than sorting a normal array
  array = Float64Array.from(array).sort();

  const posQ1 = (array.length - 1) / 4;
  const posQ3 = (array.length - 1) * (3 / 4);
  const medianPos = (array.length - 1) / 2;

  const q1MinProportion = posQ1 % 1;
  const q3MinProportion = posQ3 % 1;
  const medianMinProportion = medianPos % 1;
  return {
    min: array[0],
    q1:
      q1MinProportion === 0
        ? array[posQ1]
        : array[posQ1 >> 0] * (1 - q1MinProportion) +
          array[(posQ1 >> 0) + 1] * q1MinProportion,
    median:
      medianMinProportion === 0
        ? array[medianPos]
        : array[medianPos >> 0] * (1 - medianMinProportion) +
          array[(medianPos >> 0) + 1] * medianMinProportion,
    q3:
      q3MinProportion === 0
        ? array[posQ3]
        : array[posQ3 >> 0] * (1 - q3MinProportion) +
          array[(posQ3 >> 0) + 1] * q3MinProportion,
    max: array.at(-1) as number,
  };
}
