import { DataXY } from 'cheminfo-types';

export interface XYAlignOptions {
  /**
   * The range in which the two x values of the spectra must be to be placed on the same line. It may also be a function that allows to change `delta` depending on the X values of the spectrum
   * @default 1
   */
  delta?: ((arg: number) => number) | number;

  /**
   * If `true`, only the data considered as common to both spectra is kept. If `false`, the data y arrays are completed with zeroes where no common values are found
   * @default true
   */
  common?: boolean;

  /**
   * Defines what x values should be kept (`x1` : spectrum 1 x values, `x2` spectrum 2 x values, `weighted`: weighted average of both spectra x values)
   * @default "x1"
   */
  x?: 'x1' | 'x2' | 'weighted';
}

export interface XYAlignResult {
  x: number[];
  y1: number[];
  y2: number[];
}

/**
 * Align data of two spectra by verifying wether x values are in a certain range (`delta`).
 * The two spectra should not have two consecutive x values which difference is
 * smaller than `delta` to achieve good results!
 * @param data1 - First spectrum data
 * @param data2 - Second spectrum data
 * @param options - Options
 */
export function xyAlign(
  data1: DataXY,
  data2: DataXY,
  options: XYAlignOptions = {},
): XYAlignResult {
  const { delta = 1, common = true, x = 'x1' } = options;

  const result: XYAlignResult = {
    x: [],
    y1: [],
    y2: [],
  };

  let i = 0;
  let j = 0;

  const length1 = data1.x.length;
  const length2 = data2.x.length;

  while (i < length1 && j < length2) {
    let maxDiff = 0;

    if (typeof delta === 'function') {
      const mean = (data1.x[i] + data2.x[j]) / 2; // is this a good thing to do?
      maxDiff = delta(mean);
    } else {
      maxDiff = delta;
    }

    const difference = data1.x[i] - data2.x[j];

    if (Math.abs(difference) > maxDiff) {
      if (difference > 0) {
        if (!common) {
          result.x.push(data2.x[j]);
          result.y1.push(0);
          result.y2.push(data2.y[j]);
          if (j === length2 - 1) {
            while (i < length1) {
              result.x.push(data1.x[i]);
              result.y1.push(data1.y[i]);
              result.y2.push(0);
              i++;
            }
          }
        }
        j++;
      } else {
        if (!common) {
          result.x.push(data1.x[i]);
          result.y1.push(data1.y[i]);
          result.y2.push(0);
          if (i === length1 - 1) {
            while (j < length2) {
              result.x.push(data2.x[j]);
              result.y1.push(0);
              result.y2.push(data2.y[j]);
              j++;
            }
          }
        }
        i++;
      }
    } else {
      const weightedX =
        (data1.x[i] * data1.y[i] + data2.x[j] * data2.y[j]) /
        (data1.y[i] + data2.y[j]);

      switch (x) {
        case 'x1':
          result.x.push(data1.x[i]);
          break;
        case 'x2':
          result.x.push(data2.x[j]);
          break;
        case 'weighted':
          result.x.push(weightedX);
          break;
        default:
          throw new Error(`unknown x option value: ${String(x)}`);
      }

      result.y1.push(data1.y[i]);
      result.y2.push(data2.y[j]);

      i++;
      j++;
    }
  }
  return result;
}
