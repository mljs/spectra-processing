import type { DataXY, NumberArray } from 'cheminfo-types';

import { xGetFromToIndex } from '../../x/index.ts';
import type { XGetFromToIndexOptions } from '../../x/xGetFromToIndex.ts';

export interface CumulativeDensity {
  x: NumberArray;
  y: NumberArray;
  fromIndex: number;
  toIndex: number;
  /** integration from the first point of the range, on every point of the range */
  integral: Float64Array;
  /** beginning of the window, that may be outside of the data */
  beginX: number;
  /** end of the window, that may be outside of the data */
  endX: number;
}

/**
 * The data seen as a piecewise linear density, with the integration precomputed on every point.
 * @param data - object that contains property x (an ordered increasing array) and y (an array).
 * @param options - options.
 * @returns the cumulated integration over the selected window.
 */
export function getCumulativeDensity(
  data: DataXY,
  options: XGetFromToIndexOptions = {},
): CumulativeDensity {
  const { x, y } = data;
  const { fromIndex, toIndex } = xGetFromToIndex(x, options);
  if (toIndex - fromIndex < 1) {
    throw new Error('the selected range must contain at least 2 points');
  }

  const { beginX, endX } = getBoundaries(x, options, fromIndex, toIndex);
  const length = toIndex - fromIndex + 1;
  const integral = new Float64Array(length);
  for (let i = 1; i < length; i++) {
    const previousIndex = fromIndex + i - 1;
    const currentIndex = fromIndex + i;
    integral[i] =
      integral[i - 1] +
      ((y[previousIndex] + y[currentIndex]) / 2) *
        (x[currentIndex] - x[previousIndex]);
  }
  return { x, y, fromIndex, toIndex, integral, beginX, endX };
}

/**
 * Integration from the beginning of the range up to a specific x value, interpolating inside
 * the interval that contains it.
 * @param cumulative - cumulated integration of the density.
 * @param target - x value.
 * @returns the integration.
 */
export function evaluateCumulative(
  cumulative: CumulativeDensity,
  target: number,
): number {
  const { x, y, fromIndex, toIndex, integral } = cumulative;
  if (target <= x[fromIndex]) return 0;
  const lastIndex = toIndex - fromIndex;
  if (target >= x[toIndex]) return integral[lastIndex];

  let low = 0;
  let high = lastIndex;
  while (high - low > 1) {
    const middle = low + ((high - low) >> 1);
    if (x[fromIndex + middle] <= target) {
      low = middle;
    } else {
      high = middle;
    }
  }

  const startX = x[fromIndex + low];
  const startY = y[fromIndex + low];
  const width = target - startX;
  const targetY =
    startY +
    ((y[fromIndex + low + 1] - startY) * width) /
      (x[fromIndex + low + 1] - startX);
  return integral[low] + ((startY + targetY) / 2) * width;
}

/**
 * Boundaries of the window, that may be wider than the data itself.
 * @param x - array of x values.
 * @param options - options.
 * @param fromIndex - first index of the selected range.
 * @param toIndex - last index of the selected range.
 * @returns the x values delimiting the window.
 */
function getBoundaries(
  x: NumberArray,
  options: XGetFromToIndexOptions,
  fromIndex: number,
  toIndex: number,
) {
  const { from, to } = options;
  const firstX = x[fromIndex];
  const lastX = x[toIndex];
  let beginX =
    options.fromIndex === undefined && from !== undefined ? from : firstX;
  let endX = options.toIndex === undefined && to !== undefined ? to : lastX;
  if (beginX > endX) [beginX, endX] = [endX, beginX];
  return { beginX: Math.min(beginX, firstX), endX: Math.max(endX, lastX) };
}
