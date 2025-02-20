import type { NumberArray } from 'cheminfo-types';

import { matrixCholeskySolver } from '../matrix/matrixCholeskySolver';
import { addWeights } from '../utils/addWeights';
import { createSystemMatrix } from '../utils/createSystemMatrix';
import type { WeightsAndControlPoints } from '../utils/updateWeights';
import { updateWeights } from '../utils/updateWeights';

import { xEnsureFloat64 } from './xEnsureFloat64';
import { xMultiply } from './xMultiply';

interface XWhitakerSmootherOptions extends WeightsAndControlPoints {
  /**
   * Factor of weights matrix in -> [I + lambda D'D]z = x
   * @default 100
   */
  lambda?: number;
  /**
   * Maximum number of iterations for the baseline refinement process.
   * @default 100
   */
  maxIterations?: number;

  /**
   * Tolerance for convergence. The process stops if the change in baseline is less than this value.
   * @default 1e-6
   */
  tolerance?: number;

  /**
   * Factor used to calculate the residuals for weight updates.
   * @default 3
   */
  residualFactor?: number;

  /**
   * Learning rate for weight updates.
   * @default 0.5
   */
  learningRate?: number;

  /**
   * Minimum weight value to avoid division by zero or extremely small weights.
   * @default 0.01
   */
  minWeight?: number;
}

/**
 * Computes the baseline points for the given data using an iterative smoothing algorithm.
 * @param yData - The input data array.
 * @param options - The options for baseline computation.
 * @returns - The computed baseline points.
 */
export function xWhitakerSmoother(
  yData: NumberArray,
  options: XWhitakerSmootherOptions = {},
) {
  const {
    lambda = 100,
    maxIterations = 100,
    tolerance = 1e-6,
    residualFactor = 3,
    learningRate = 0.5,
    minWeight = 0.01,
  } = options;

  const size = yData.length;

  const { controlPoints, weights } = getWeightsAndControlPoints(yData, options);
  const prevBaseline: Float64Array = new Float64Array(size);

  let iteration = 0;
  let delta = Infinity;
  let baseline = yData.slice();
  const upperTriangularNonZeros = createSystemMatrix(size, lambda);
  while (iteration < maxIterations && delta > tolerance) {
    const { leftHandSide, rightHandSide } = addWeights(
      upperTriangularNonZeros,
      yData,
      weights,
    );

    const cho = matrixCholeskySolver(leftHandSide, size);

    if (!cho) {
      return baseline;
    }

    const newBaseline = cho(rightHandSide);

    updateWeights(yData, newBaseline, weights, {
      controlPoints,
      minWeight,
      learningRate,
      residualFactor,
    });

    delta = calculateDelta(newBaseline, prevBaseline, size);
    prevBaseline.set(newBaseline);
    baseline = xEnsureFloat64(newBaseline);
    iteration++;
  }

  return baseline;
}

/**
 * Calculates the delta between the current and previous baseline.
 * @param baseline - The current baseline array.
 * @param prevBaseline - The previous baseline array.
 * @param n - The length of the arrays.
 * @returns - The calculated delta value.
 */
function calculateDelta(
  baseline: NumberArray,
  prevBaseline: NumberArray,
  n: number,
): number {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += (baseline[i] - prevBaseline[i]) ** 2;
  }
  return Math.sqrt(sum / n);
}

/**
 * Retrieves the control points and weights for the given data, the weights are modified multiplication of controlPoints if it exists.
 * @param  y - The input data array.
 * @param  options - The options for control points and weights.
 * @returns - The control points and weights.
 */
function getWeightsAndControlPoints(
  y: NumberArray,
  options: WeightsAndControlPoints = {},
): { weights: NumberArray; controlPoints?: NumberArray } {
  const { length } = y;
  const { controlPoints } = options;
  const { weights = Float64Array.from({ length }).fill(1) } = options;

  if (controlPoints && controlPoints.length !== y.length) {
    throw new RangeError('controlPoints should match the length with X');
  } else if (weights.length !== y.length) {
    throw new RangeError('weights should match the length with X');
  }

  return {
    weights: controlPoints ? xMultiply(weights, controlPoints) : weights,
    controlPoints,
  };
}
