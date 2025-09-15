/**
 *
 * Dong, Jian, et al. "An algorithm of filtering noises in multi-beam data based on rolling circle transform." 2019 2nd International Conference on Sustainable Energy, Environment and Information Engineering (SEEIE 2019). Atlantis Press, 2019.
 * DONG Jian, PENG Rencan, ZHANG Lihua, WANG Zhijun. An Algorithm of Filtering Noises in Multi-beam Data Based on Rolling Circle Transform[J]. Geomatics and Information Science of Wuhan University, 2016, 41(1): 86-92. DOI: 10.13203/j.whugis20130757
 * @param data
 * @param options
 */

import type { DataXY } from 'cheminfo-types';

import { xFindClosestIndex } from '../x/xFindClosestIndex.ts';

interface XYRollingCircleTransformOptions {
  /**
   * The radius of the circle used for the rolling circle transform.
   * It should be a positive number and in the 'x' unit
   * @default 1
   */
  radius?: number; // radius of the circle
  /**
   * Should the circle scan the top or the bottom of the XY data ?
   * @default 'top'
   */
  position?: 'top' | 'bottom'; // position of the circle relative to the peak
  /**
   * Should we keep the Y centers of the circles or should we move the centers
   * so that it touches the XY data ?
   * @default: true
   */
  shifted?: boolean; // if true, the y values will be shifted to fit the circle center
}

export function xyRollingCircleTransform(
  data: DataXY,
  options: XYRollingCircleTransformOptions = {},
): Float64Array {
  const { x } = data;
  let { y } = data;
  const { radius = 1, position = 'top', shifted = true } = options;

  if (position !== 'top' && position !== 'bottom') {
    throw new Error(`Invalid position: ${String(position)}`);
  }

  if (position === 'bottom') {
    y = y.slice();
    for (let i = 0; i < y.length; i++) {
      y[i] = -y[i];
    }
  }

  if (x.length === 0 || y.length === 0) {
    return new Float64Array();
  }
  const yCenters = new Float64Array(x.length);
  for (let i = 0; i < x.length; i++) {
    const x0 = x[i]; // x center of the current circle
    const fromX = xFindClosestIndex(x, x0 - radius);
    const toX = xFindClosestIndex(x, x0 + radius);

    // for the circle radius we need to evaluate the minimal vertical shift

    const y0 = y[i] + radius; // y center of the circle on top of peak
    let yShift = y0; // this is the minimal possible shift
    for (let j = fromX; j <= toX; j++) {
      const currentX = x[j];
      if (currentX < x0 - radius || currentX > x0 + radius) {
        continue;
      }
      const currentMinYShift =
        y[j] + Math.sqrt(radius ** 2 - (currentX - x0) ** 2);
      if (currentMinYShift > yShift) {
        yShift = currentMinYShift;
      }
    }
    yCenters[i] = yShift;
  }
  if (!shifted) {
    for (let i = 0; i < yCenters.length; i++) {
      yCenters[i] -= radius;
    }
  }

  if (position === 'bottom') {
    for (let i = 0; i < yCenters.length; i++) {
      yCenters[i] = -yCenters[i];
    }
  }

  return yCenters;
}
