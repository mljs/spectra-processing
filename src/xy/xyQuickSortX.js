import { xyCheck } from './xyCheck';

/**
 *This function performs a quick sort of the x array while transforming the y array to preserve the coordinates.
 * @param {DataXY} [data] Object that contains property x (Array) and y (Array)
 */
export function xyQuickSortX(data) {
  xyCheck(data);

  let { x, y } = data;
  if (x.length < 2) {
    return { x: new Float64Array.from(x), y: new Float64Array.from(y) };
  }
  x = Float64Array.from(x);
  y = Float64Array.from(y);

  return { x, y };
}
