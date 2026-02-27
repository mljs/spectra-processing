import type { NumberArray } from 'cheminfo-types';

import { xAbsolute } from '../x/xAbsolute.ts';
import { xMedian } from '../x/xMedian.ts';
import { xSubtract } from '../x/xSubtract.ts';

export interface WeightsAndControlPoints {
  /**
   * Control points to determine which weights to update.
   */
  controlPoints?: NumberArray;
  /**
   * Array of weights
   * @default [1,1,...,1]
   */
  weights?: NumberArray;
}

export interface CalculateAdaptiveWeightsOptions extends WeightsAndControlPoints {
  /**
   * Factor that determines how quickly the weights are updated in each iteration.
   * A value between 0 and 1, where higher values mean faster updates.
   * @default 0.5
   */
  learningRate?: number;

  /**
   * Factor used to calculate the threshold for determining outliers in the residuals.
   * Higher values mean more tolerance for outliers. The default value is based on noise follow the normal distribution
   * values over 3 times the standard-deviation could be marked as signals or outliers.
   * @default 3
   */
  factorStd?: number;
}

/**
 * Calculate the weights based on the control points and the MAD between the original data and the new baseline.
 * MAD (Median Absolute Deviation) is more robust to outliers and
 * the factor (1.4826) makes MAD scaled to be equivalent to the standard deviation for
 * normal distributions. {@link https://en.m.wikipedia.org/wiki/Median_absolute_deviation}.
 * @param yData - The original data.
 * @param baseline - The new baseline calculated.
 * @param weights - The current weights to be updated.
 * @param options - Options for updating weights.
 * @returns new array of weights.
 */

export function calculateAdaptiveWeights(
  yData: NumberArray,
  baseline: NumberArray,
  weights: NumberArray,
  options: CalculateAdaptiveWeightsOptions,
) {
  const { controlPoints, factorStd = 3, learningRate = 0.5 } = options;

  if (learningRate === 0) {
    return weights;
  }

  const absResiduals = xAbsolute(xSubtract(yData, baseline));

  const medAbsRes = xMedian(absResiduals);
  const mad = 1.4826 * medAbsRes;
  const threshold = factorStd * mad;

  const rawWeights = new Float64Array(absResiduals.length);
  for (let i = 0; i < absResiduals.length; i++) {
    rawWeights[i] = Math.exp(-((absResiduals[i] / threshold) ** 2));
  }

  const oneMinusLearningRate = 1 - learningRate;
  for (let i = 0; i < weights.length; i++) {
    let weight = weights[i];
    weight = (oneMinusLearningRate * weight + learningRate * rawWeights[i]) / 4;

    if (controlPoints && controlPoints[i] > 0) {
      weight *= 4;
    }

    weights[i] = weight;
  }
  weights[0] = 1;
  weights[weights.length - 1] = 1;

  return weights;
}
