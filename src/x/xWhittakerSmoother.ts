import type { NumberArray } from 'cheminfo-types';

import { matrixCholeskySolver } from '../matrix/index.ts';
import { addWeights } from '../utils/addWeights.ts';
import { createSystemMatrix } from '../utils/createSystemMatrix.ts';
import type {
  CalculateAdaptiveWeightsOptions,
  WeightsAndControlPoints,
} from '../utils/index.ts';
import { calculateAdaptiveWeights } from '../utils/index.ts';

import { xEnsureFloat64 } from './xEnsureFloat64.ts';
import { xMultiply } from './xMultiply.ts';

export interface XWhittakerSmootherOptions extends CalculateAdaptiveWeightsOptions {
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
   * Learning rate for weight updates.
   * @default 0.5
   */
  learningRate?: number;
  /**
   * Solver algorithm to use for the smoothing routine.
   * - `'cholesky'` — build the full (symmetric) system and solve using a
   *   Cholesky decomposition. Generally more robust for small/medium arrays
   *   and when a matrix factorization is acceptable.
   * - `'thomas'` — use a tridiagonal formulation and solve with the Thomas
   *   algorithm (specialised tridiagonal solver). Lower memory usage and
   *   faster for large inputs when the system is tridiagonal.
   * @default 'cholesky'
   */
  algorithm?: 'cholesky' | 'thomas';
}

export function xWhittakerSmoother(
  yData: NumberArray,
  options: XWhittakerSmootherOptions = {},
) {
  const { algorithm = 'cholesky', ...restOptions } = options;

  if (algorithm === 'thomas') {
    return whittakerByThomas(yData, restOptions);
  }

  return whittakerByCholesky(yData, restOptions);
}

/**
 * @deprecated Use xWhittakerSmoother instead.
 * TODO: Remove in next major version.
 */
export const xWhitakerSmoother = xWhittakerSmoother;

/**
 * Computes the baseline points for the given data using an iterative smoothing algorithm.
 * @param yData - The input data array.
 * @param options - The options for baseline computation.
 * @returns - The computed baseline points.
 */
function whittakerByCholesky(
  yData: NumberArray,
  options: XWhittakerSmootherOptions = {},
) {
  const {
    lambda = 100,
    maxIterations = 100,
    tolerance = 1e-6,
    factorStd = 3,
    learningRate = 0.5,
  } = options;

  const size = yData.length;

  // eslint-disable-next-line prefer-const
  const { controlPoints, weights } = getWeightsAndControlPoints(yData, options);
  const prevBaseline: Float64Array = new Float64Array(size);

  let iteration = 0;
  let delta = Infinity;
  let baseline = xEnsureFloat64(yData);
  const { upperTriangularNonZeros, permutationEncodedArray } =
    createSystemMatrix(size, lambda);
  while (iteration < maxIterations && delta > tolerance) {
    const { leftHandSide, rightHandSide } = addWeights(
      upperTriangularNonZeros,
      yData,
      weights,
    );

    const cho = matrixCholeskySolver(
      leftHandSide,
      size,
      permutationEncodedArray,
    );

    if (!cho) {
      return baseline;
    }

    const newBaseline = cho(rightHandSide);

    //weights is updated inplace
    calculateAdaptiveWeights(yData, newBaseline, weights, {
      controlPoints,
      learningRate,
      factorStd,
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
 * @returns - The control points and modified weights.
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

function whittakerByThomas(
  yData: NumberArray,
  options: XWhittakerSmootherOptions = {},
) {
  const {
    lambda = 100,
    maxIterations = 100,
    tolerance = 1e-6,
    factorStd = 3,
    learningRate = 0.5,
  } = options;

  const n = yData.length;
  const y = xEnsureFloat64(yData);
  const { controlPoints, weights } = getWeightsAndControlPoints(yData, options);

  const prevBaseline = new Float64Array(n);
  let baseline = xEnsureFloat64(yData);

  // Precompute base diagonal and constant off-diagonals (−lambda)
  const baseDiag = new Float64Array(n);
  if (n === 1) {
    baseDiag[0] = lambda;
  } else {
    baseDiag[0] = lambda;
    for (let i = 1; i < n - 1; i++) baseDiag[i] = 2 * lambda;
    baseDiag[n - 1] = lambda;
  }
  const lower = new Float64Array(Math.max(0, n - 1));
  const upper = new Float64Array(Math.max(0, n - 1));
  for (let i = 0; i < lower.length; i++) {
    lower[i] = -lambda;
    upper[i] = -lambda;
  }

  const main = new Float64Array(n);
  const rhs = new Float64Array(n);
  const solution = new Float64Array(n);
  const workC = new Float64Array(Math.max(0, n - 1));
  const workD = new Float64Array(n);

  let iteration = 0;
  let delta = Infinity;

  /**
   * Iterative Whittaker smoothing implementation using the Thomas algorithm
   * (tridiagonal solver). The method constructs the system
   * [W + lambda * D'D] z = W * y where D is the second-difference operator
   * and W are adaptive weights. At each iteration the tridiagonal system is
   * solved with the Thomas algorithm and the weights are updated using
   * `calculateAdaptiveWeights` until convergence.
   *
   * Use this algorithm by passing `algorithm: 'thomas'` to `xWhittakerSmoother`.
   * It is more memory-efficient for large inputs because it avoids forming
   * the full banded matrix, but both implementations aim to produce the same
   * baseline result.
   * @param yData - input signal/spectrum
   * @param options - smoothing options (supports `lambda`, `maxIterations`,
   *                  `tolerance`, `factorStd`, `learningRate`, and optional
   *                  `controlPoints` / `weights` inherited from
   *                  `CalculateAdaptiveWeightsOptions`).
   * @returns baseline as a `Float64Array`.
   */

  while (iteration < maxIterations && delta > tolerance) {
    // Build main diagonal = baseDiag + weights, and RHS = weights * y
    for (let i = 0; i < n; i++) {
      main[i] = baseDiag[i] + weights[i];
      rhs[i] = weights[i] * y[i];
    }

    // Solve tridiagonal system in-place into `solution`
    solveTridiagonalFloat64(lower, main, upper, rhs, solution, workC, workD);

    calculateAdaptiveWeights(y, solution, weights, {
      controlPoints,
      learningRate,
      factorStd,
    });

    delta = calculateDelta(solution, prevBaseline, n);
    prevBaseline.set(solution);
    baseline = xEnsureFloat64(solution);
    iteration++;
  }

  return baseline;
}

function solveTridiagonalFloat64(
  lower: Float64Array,
  diag: Float64Array,
  upper: Float64Array,
  rhs: Float64Array,
  out?: Float64Array,
  cp?: Float64Array,
  dp?: Float64Array,
): Float64Array {
  const n = diag.length;
  const x = out ?? new Float64Array(n);
  if (n === 0) return x;
  if (n === 1) {
    x[0] = rhs[0] / diag[0];
    return x;
  }
  const cprime = cp ?? new Float64Array(n - 1);
  const dprime = dp ?? new Float64Array(n);

  let denom = diag[0];
  cprime[0] = upper[0] / denom;
  dprime[0] = rhs[0] / denom;

  for (let i = 1; i < n - 1; i++) {
    denom = diag[i] - lower[i - 1] * cprime[i - 1];
    cprime[i] = upper[i] / denom;
    dprime[i] = (rhs[i] - lower[i - 1] * dprime[i - 1]) / denom;
  }

  denom = diag[n - 1] - lower[n - 2] * cprime[n - 2];
  dprime[n - 1] = (rhs[n - 1] - lower[n - 2] * dprime[n - 2]) / denom;

  x[n - 1] = dprime[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    x[i] = dprime[i] - cprime[i] * x[i + 1];
  }
  return x;
}
