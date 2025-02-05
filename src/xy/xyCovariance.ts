import type { DataXY } from 'cheminfo-types';

import { xMean } from '../x';

export interface XYCovarianceOptions {
  /**
   * if true, divide by (n-1); if false, divide by n
   * @default true
   */
  unbiased?: boolean;
}

/**
 * Finds the covariance of the points.
 * @param data - object containing the x and y arrays
 * @param options - object containing the unbiased boolean
 * @returns the covariance
 */
export function xyCovariance(
  data: DataXY,
  options: XYCovarianceOptions = {},
): number {
  const { x, y } = data;
  const { unbiased = true } = options;

  const meanX = xMean(x);
  const meanY = xMean(y);

  let error = 0;

  for (let i = 0; i < x.length; i++) {
    error += (x[i] - meanX) * (y[i] - meanY);
  }

  if (unbiased) {
    return error / (x.length - 1);
  } else {
    return error / x.length;
  }
}
