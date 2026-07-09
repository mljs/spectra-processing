import type { NumberArray } from 'cheminfo-types';

import { getSortedFloat64 } from './getSortedFloat64.ts';
import { xCheck } from './xCheck.ts';

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
 * @param array - data.
 * @returns q1, median, q3, min, max.
 */
export function xBoxPlot(array: NumberArray): XBoxPlot {
  xCheck(array);

  // duplicate the array to avoid modifying the original one
  // and sort typed array that is much faster than sorting a normal array
  const sorted = getSortedFloat64(array);

  return boxPlotFromSorted(sorted);
}

/**
 * Calculating the box plot of an already-sorted array, without copying or re-sorting.
 * Internal helper: not re-exported from `x/index.ts`, so it stays out of the public API.
 * @param array - sorted data.
 * @returns q1, median, q3, min, max.
 */
export function boxPlotFromSorted(array: Float64Array): XBoxPlot {
  const min = array[0];
  const max = array.at(-1) as number;
  // need to deal with very close points otherwise it yields to incorrect results
  if (max - min <= Number.EPSILON) {
    // if one of the 2 numbers is an integer let's take this one
    const shortTestNumber = String(min).length < String(max).length ? min : max;
    return {
      min,
      q1: shortTestNumber,
      median: shortTestNumber,
      q3: shortTestNumber,
      max,
    };
  }
  const posQ1 = (array.length - 1) / 4;
  const posQ3 = (array.length - 1) * (3 / 4);
  const medianPos = (array.length - 1) / 2;

  const q1MinProportion = posQ1 % 1;
  const q3MinProportion = posQ3 % 1;

  const medianMinProportion = medianPos % 1;
  return {
    min,
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
    max,
  };
}
