import { NumberArray } from 'cheminfo-types';

export interface XBoxPlotOptions {
  /**
   * By default, there should be at least 5 elements.
   * @default false
   */
  allowSmallArray?: boolean;
}

export interface XBoxPlot {
  q1: number;
  median: number;
  q3: number;
  min: number;
  max: number;
}

/**
 * Calculating the box plot of the array
 * @param array - data
 * @param options
 * @returns - q1, median, q3, min, max
 */
export function xBoxPlot(
  array: NumberArray,
  options: XBoxPlotOptions = {},
): XBoxPlot {
  const { allowSmallArray = false } = options;
  if (array.length < 5) {
    if (allowSmallArray) {
      if (array.length === 0) {
        throw new Error('can not calculate info if array is empty');
      }
    } else {
      throw new Error(
        'can not calculate info if array contains less than 5 elements',
      );
    }
  }

  array = Float64Array.from(array).sort();

  const info: XBoxPlot = {
    q1: 0,
    median: 0,
    q3: 0,
    min: array[0],
    max: array.at(-1) as number,
  };
  let q1max, q3min;
  if (array.length % 2 === 1) {
    // odd
    const middle = (array.length - 1) / 2;
    info.median = array[middle];
    q1max = Math.max(middle - 1, 0);
    q3min = Math.min(middle + 1, array.length - 1);
  } else {
    // even
    q3min = array.length / 2;
    q1max = q3min - 1;
    info.median = (array[q1max] + array[q3min]) / 2;
  }
  if (q1max % 2 === 0) {
    info.q1 = array[q1max / 2];
    info.q3 = array[(array.length + q3min - 1) / 2];
  } else {
    info.q1 = (array[(q1max + 1) / 2] + array[(q1max - 1) / 2]) / 2;
    const middleOver = (array.length + q3min) / 2;
    info.q3 = (array[middleOver] + array[middleOver - 1]) / 2;
  }

  return info;
}
