import { DataXYZ } from '..';

import { xyCheck } from './xyCheck';
/**
 * Finds all the min values
 * If the values are equal the middle
 * of the equal part will be the position of the signal!
 *
 * @param [data={}] - Object that contains property X (an ordered increasing array) and y (an arraY).
 * @param data.x - X.
 * @param data.y - Y.
 * @param data.z - Z.
 * @param _options - Options.
 * @returns Array of points.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function xyMinimaY(data: DataXYZ = {}, _options = {}) {
  xyCheck(data);
  const { x, y } = data;
  if (x === undefined || y === undefined || x.length < 3) return [];
  let maxima = [];
  let startEqualIndex = -1;
  for (let i = 1; i < x.length - 1; i++) {
    if (y[i - 1] > y[i] && y[i + 1] > y[i]) {
      maxima.push({ x: x[i], y: y[i], index: i });
    } else if (y[i - 1] > y[i] && y[i + 1] === y[i]) {
      startEqualIndex = i;
    } else if (y[i - 1] === y[i] && y[i + 1] > y[i]) {
      let index = ((i + startEqualIndex) / 2) >> 0;
      maxima.push({ x: x[index], y: y[index], index });
    }
  }
  return maxima;
}
