import { DataXY } from 'cheminfo-types';
import mean from 'ml-array-mean';

/**
 * @param points
 * @param options
 * @return the covariance
 */
export function xyCovariance(
  points: DataXY,
  options: {
    /** if true, divide by (n-1); if false, divide by n
     * @default true
     */
    unbiased?: number;
  } = {},
): number {
  const { x, y } = points;
  const { unbiased = true } = options;

  const meanX = mean(x);
  const meanY = mean(y);

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
