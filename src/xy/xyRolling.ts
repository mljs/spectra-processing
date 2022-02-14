import { DoubleArray, DataXY } from 'cheminfo-types';

import { xRolling } from '../x/xRolling';
import { xRollingAverage } from '../x/xRollingAverage';

/**
 * This function calculates a rolling average.
 * This methods will recalculate the x values by using xRollingAverage
 *
 * @param points - array of points {x,y}
 * @param fct - callback function that from an array returns a value.
 * @param options - options
 */
export function xyRolling(
  points: DataXY,
  fct?: (array: DoubleArray) => number,
  options = {},
): DataXY {
  let { x, y } = points;

  y = xRolling(y, fct, options);

  if (x.length !== y.length) {
    x = xRollingAverage(x, options);
  }

  return { x, y };
}
