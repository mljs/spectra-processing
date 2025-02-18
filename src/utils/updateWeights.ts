import type { NumberArray } from 'cheminfo-types';

import { xAbsolute } from '../x/xAbsolute';
import { xMedian } from '../x/xMedian';
import { xSubtract } from '../x/xSubtract';

interface UpdateWeightsOptions {
  controlPoints?: NumberArray;
  learningRate: number;
  minWeight: number;
  residualFactor: number;
}

/**
 * Update the weights based on the residuals between the original data and the new baseline.
 * @param yData - The original data.
 * @param newBaseline - The new baseline calculated.
 * @param weights - The current weights to be updated.
 * @param options - Options for updating weights.
 * @param options.learningRate - The learning rate for updating weights.
 * @param options.minWeight - The minimum weight value.
 * @param options.residualFactor - The factor to calculate the threshold for residuals.
 * @param options.controlPoints - Control points to determine which weights to update.
 * @returns The updated weights.
 */

export function updateWeights(
  yData: NumberArray,
  newBaseline: NumberArray,
  weights: NumberArray,
  options: UpdateWeightsOptions,
) {
  const { controlPoints, residualFactor, learningRate, minWeight } = options;
  const absResiduals = xAbsolute(xSubtract(yData, newBaseline));

  const medAbsRes = xMedian(absResiduals);
  const mad = 1.4826 * medAbsRes;
  const threshold = residualFactor * mad;

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
