import type { DataXY } from 'cheminfo-types';

import { rollingCircle } from './utils/rollingCircle.ts';
import type { XYRollingCircleOptions } from './xyRollingCircle.ts';

/** @deprecated use `XYRollingCircleOptions` */
export type XYRollingCircleTransformOptions = XYRollingCircleOptions;

/**
 * Rolls a circle (or an ellipse when `yRadius` / `relativeYRadius` is used) along
 * the data and returns, for each point, the y position of the shape center.
 *
 * Use `xyRollingCircle` to also get the points touched by the shape.
 *
 * Dong, Jian, et al. "An algorithm of filtering noises in multi-beam data based on rolling circle transform." 2019 2nd International Conference on Sustainable Energy, Environment and Information Engineering (SEEIE 2019). Atlantis Press, 2019.
 * DONG Jian, PENG Rencan, ZHANG Lihua, WANG Zhijun. An Algorithm of Filtering Noises in Multi-beam Data Based on Rolling Circle Transform[J]. Geomatics and Information Science of Wuhan University, 2016, 41(1): 86-92. DOI: 10.13203/j.whugis20130757
 * @param data - data with x and y arrays.
 * @param options - options.
 * @returns the y position of the center of the rolling shape for each x value.
 */
export function xyRollingCircleTransform(
  data: DataXY,
  options: XYRollingCircleOptions = {},
): Float64Array {
  return rollingCircle(data, options).y;
}
