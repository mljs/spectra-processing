import { DataXY } from 'cheminfo-types';

import { xCumulative, xMaxValue } from '../x';

import { xyCheck } from './xyCheck';
import { xyMaxYPoint } from './xyMaxYPoint';

const STEPS = [0.25, 0.5, 0.75] as const;

export interface XYCumulativeDistributionStatisticsResult {
  x0: number;
  x25: number;
  x50: number;
  x75: number;
  x100: number;
  xMode: number;
  xMean: number;
}

/**
 * Cumulative Distribution Statistics
 * @param data - array of points {x,y}
 * @returns x0, x25, x50, x75, x100, xMode, xMean (x for maxY)
 */
export function xyCumulativeDistributionStatistics(
  data: DataXY,
): XYCumulativeDistributionStatisticsResult {
  xyCheck(data, { minLength: 1 });
  const { x, y } = data;
  const cumulativeSum = xCumulative(y);
  const maxY = xMaxValue(cumulativeSum);
  for (let i = 0; i < cumulativeSum.length; i++) {
    cumulativeSum[i] /= maxY;
  }

  const result: XYCumulativeDistributionStatisticsResult = {
    x0: 0,
    x25: 0,
    x50: 0,
    x75: 0,
    x100: 0,
    xMode: 0,
    xMean: 0,
  };

  // need to find the x values closest to STEPS/100
  result.x0 = x[0];
  result.x100 = x.at(-1) as number;

  let currentStep = 0;
  breakPoint: for (let i = 1; i < cumulativeSum.length; i++) {
    while (STEPS[currentStep] < cumulativeSum[i]) {
      // Key is computed dynamically with a multiplication. This cannot be type-safe, hence the "as" assertion.
      const key = `x${STEPS[currentStep] * 100}` as keyof typeof result;
      result[key] =
        x[i - 1] +
        (x[i] - x[i - 1]) *
          ((STEPS[currentStep] - cumulativeSum[i - 1]) /
            (cumulativeSum[i] - cumulativeSum[i - 1]));
      currentStep++;
      if (currentStep === STEPS.length) break breakPoint;
    }
  }
  result.xMode = xyMaxYPoint(data).x;

  let sumXY = 0;
  let sumY = 0;
  for (let i = 0; i < x.length; i++) {
    sumXY += x[i] * y[i];
    sumY += y[i];
  }
  result.xMean = sumXY / sumY;

  return result;
}
