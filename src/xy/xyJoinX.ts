import { Data } from '..';

import { xyCheck } from './xyCheck';
/**
 * Join x / y values when difference in X is closer than delta.
 * When joining, y values are summed and x values are weighted average
 *
 * @param {object} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
 * @param {number[]} data.x data
 * @param {number[]} data.y data
 * @param {object} [options={}] Options
 * @param {number | Function} [options.delta=1] The range in which the two x values of the spectra must be to be placed on the same line. It may also be a function that allows to change `delta` depending on the X values of the spectrum
 * @returns {Data} An object with the xyIntegration function
 */
export function xyJoinX(
  data: {
    x?: number[] | Float64Array | Float32Array | Uint16Array;
    y?: number[] | Float64Array | Float32Array | Uint16Array;
  } = {},
  options: { delta?: ((arg: number) => number) | number } = {},
): Data {
  xyCheck(data);
  const { delta = 1 } = options;
  const deltaIsFunction = typeof delta === 'function';
  const x = Array.from(data.x as number[]);
  const y = Array.from(data.y as number[]);
  if (x.length < 2) {
    return { x, y };
  }
  let position = 0;

  for (let i = 1; i < x.length; i++) {
    let difference = x[i] - x[i - 1];
    let currentDelta = deltaIsFunction ? delta((x[i] + x[i - 1]) / 2) : delta;

    if (difference <= currentDelta) {
      // we join
      if (y[position] !== 0 || y[i] !== 0) {
        x[position] =
          (x[position] * y[position] + x[i] * y[i]) / (y[position] + y[i]);
        y[position] += y[i];
      }
    } else {
      position++;
      x[position] = x[i];
      y[position] = y[i];
    }
  }

  x.length = position + 1;
  y.length = position + 1;
  return { x, y };
}
