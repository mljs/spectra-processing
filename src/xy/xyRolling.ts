import { DataXY } from 'cheminfo-types';

import { xRolling, xRollingAverage, XRollingOptions } from '../x';

/**
 * This function calculates a rolling average.
 * This methods will recalculate the x values by using xRollingAverage
 * @param data - array of points {x,y}
 * @param fct - callback function that from an array returns a value.
 * @param options - options
 */
export function xyRolling(
  data: DataXY,
  fct?: (array: Float64Array) => number,
  options: XRollingOptions = {},
): DataXY {
  let { x, y } = data;

  y = xRolling(y, fct, options);

  if (x.length !== y.length) {
    x = xRollingAverage(x, options);
  }

  return { x, y };
}
