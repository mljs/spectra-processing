import type { NumberArray } from 'cheminfo-types';

import { xAbsolute } from '../x/xAbsolute';
import { xMedian } from '../x/xMedian';
import { xSubtract } from '../x/xSubtract';

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

export interface UpdateWeightsOptions extends WeightsAndControlPoints {
  /**
   * Factor that determines how quickly the weights are updated in each iteration.
   * A value between 0 and 1, where higher values mean faster updates.
   * @default 0.5
   */
  learningRate: number;
  /**
   * The minimum allowed weight value to prevent weights from becoming too small.
   * @default 0.01
   */
  minWeight: number;
  /**
   * Factor used to calculate the threshold for determining outliers in the residuals.
   * Higher values mean more tolerance for outliers. The default value is based on noise follow the normal distribution
   * values over 3 times the standard-deviation could be marked as signals or outliers.
   * @default 3
   */
  factorStd: number;
}

/**
 * Update the weights based on the residuals between the original data and the new baseline.
 * @param yData - The original data.
 * @param newBaseline - The new baseline calculated.
 * @param weights - The current weights to be updated.
 * @param options - Options for updating weights in the Whittaker smoothing algorithm.
 * @returns The updated weights.
 */

export function updateWeights(
  yData: NumberArray,
  newBaseline: NumberArray,
  weights: NumberArray,
  options: UpdateWeightsOptions,
) {
  const { controlPoints, factorStd, learningRate, minWeight } = options;
  const absResiduals = xAbsolute(xSubtract(yData, newBaseline));

  const medAbsRes = xMedian(absResiduals);
  const mad = 1.4826 * medAbsRes;
  const threshold = factorStd * mad;

  const rawWeights = new Float64Array(absResiduals.length);
  for (let i = 0; i < absResiduals.length; i++) {
    rawWeights[i] = Math.exp(-((absResiduals[i] / threshold) ** 2));
  }

  let maxWeight = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < weights.length; i++) {
    if (controlPoints && controlPoints[i] > 0) continue;
    weights[i] = Math.max(
      minWeight,
      (1 - learningRate) * weights[i] + learningRate * rawWeights[i],
    );
    if (maxWeight < weights[i]) {
      maxWeight = weights[i];
    }
  }
  weights[0] = maxWeight;
  weights[weights.length - 1] = maxWeight;

  return weights;
}
