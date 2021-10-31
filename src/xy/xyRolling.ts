import { ArrayType, DataXY } from '..';
import { xRolling } from '../x/xRolling';
import { xRollingAverage } from '../x/xRollingAverage';
/**
 * This function calculates a rolling average
 *
 * This methods will recalculate the x values by using xRollingAverage
 *
 * @param {DataXY} [points] array of points {x,y}
 * @param {Function} [fct] callback function that from an array returns a value.
 * @param {object} options options
 * @returns {DataXY} results
 */
export function xyRolling(
  points: DataXY,
  fct?: (array: ArrayType) => number,
  options = {},
): DataXY {
  let { x, y } = points;

  y = xRolling(y, fct, options);

  if (x.length !== y.length) {
    x = xRollingAverage(x, options);
  }

  return { x, y };
}
