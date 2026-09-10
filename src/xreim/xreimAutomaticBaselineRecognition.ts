import type { DoubleArray } from 'cheminfo-types';

import type { DataXReIm } from '../types/index.ts';

export interface AutomaticBaselineRecognitionOptions {
  /**
   * Scale parameter for the discrete CWT-Haar derivative approximation.
   * Larger values reduce noise but widen the detected peaks.
   * A value of 'auto' computes a heuristic scale based on the spectrum length.
   * @default 'auto'
   */
  scale?: number | 'auto';

  /**
   * Multiplicative factor used in the iterative thresholding rule.
   * The threshold is the mean plus factor × standard deviation.
   * A value close to 0.5 is often more robust for the unnormalized CWT derivative
   * used here than the 3 used in the original Dietrich procedure.
   * @default 0.5
   */
  thresholdFactor?: number;

  /**
   * Radius of the 1D erosion filter used to remove isolated spikes in the mask.
   * @default 1
   */
  erosionRadius?: number;

  /**
   * Signal component used for the analysis.
   * - 're': use the real component.
   * - 'im': use the imaginary component.
   * - 'magnitude': use the magnitude of the complex signal.
   * @default 're'
   */
  component?: 're' | 'im' | 'magnitude';
}

/**
 * Automatically detects signal-free regions in a 1D spectrum using an
 * approximate CWT-Haar derivative followed by iterative thresholding.
 *
 * The output is a binary mask where 1 marks points belonging to the baseline
 * (signal-free regions) and 0 marks points associated with peaks or signal.
 * @param data - object of kind {x:[], re:[], im:[]}
 * @param options - recognition options
 * @returns a binary mask as a Uint8Array
 */
export function xreimAutomaticBaselineRecognition(
  data: Omit<DataXReIm, 'im'> & { im?: DoubleArray },
  options: AutomaticBaselineRecognitionOptions = {},
): Uint8Array {
  const {
    scale = 'auto',
    thresholdFactor = 0.5,
    erosionRadius = 1,
    component = 're',
  } = options;

  const length = data.x.length;
  if (data.re.length !== length || (data.im && data.im.length !== length)) {
    throw new TypeError('length of x, re and im must be identical');
  }

  if (!data.im && component !== 're') {
    throw new TypeError(
      `component '${component}' requires im array to be defined`,
    );
  }

  const signal = getSignal({ im: data.re, ...data }, component);
  const actualScale = resolveScale(length, scale);

  // OPTIMIZATION 1: O(N) derivative computation
  const derivative = computeCwtHaarDerivative(signal, actualScale);

  const power = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    const value = derivative[i];
    power[i] = value * value;
  }

  // OPTIMIZATION 2: Iterative threshold without array allocations
  const threshold = iterativeThreshold(power, thresholdFactor);

  const mask = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    mask[i] = power[i] <= threshold ? 1 : 0;
  }

  if (erosionRadius > 0) {
    return erodeMask(mask, erosionRadius);
  }
  return mask;
}

function computeCwtHaarDerivative(
  signal: DoubleArray,
  scale: number,
): Float64Array {
  const length = signal.length;
  const derivative = new Float64Array(length);
  if (scale <= 0) return derivative;

  // We want: sum_{j=1 to scale} (signal[i+j] - signal[i-j])
  // This is: (sum of right window) - (sum of left window)
  let leftSum = 0;
  let rightSum = 0;

  // Initialize windows for the first valid i (i = scale)
  for (let j = 1; j <= scale; j++) {
    leftSum += signal[scale - j];
    rightSum += signal[scale + j];
  }
  derivative[scale] = (rightSum - leftSum) / scale;

  for (let i = scale + 1; i < length - scale; i++) {
    // Slide windows: subtract the element leaving and add the element entering
    leftSum = leftSum - signal[i - scale - 1] + signal[i - 1];
    rightSum = rightSum - signal[i + 1] + signal[i + scale + 1];
    derivative[i] = (rightSum - leftSum) / scale;
  }

  return derivative;
}

function iterativeThreshold(values: Float64Array, factor: number): number {
  let threshold = calculateThresholdFiltered(
    values,
    factor,
    Number.POSITIVE_INFINITY,
  );
  let previousThreshold = Number.POSITIVE_INFINITY;

  // Max iterations safety cap to prevent infinite loops in edge cases
  let iterations = 0;
  while (Math.abs(previousThreshold - threshold) > 1e-12 && iterations < 100) {
    previousThreshold = threshold;
    threshold = calculateThresholdFiltered(values, factor, threshold);
    iterations++;
  }

  return threshold;
}

/**
 * Calculates mean + factor * std, but only considers values <= currentThreshold
 * This removes the need to create a new filtered array every iteration.
 * @param values
 * @param factor
 * @param currentThreshold
 */
function calculateThresholdFiltered(
  values: Float64Array,
  factor: number,
  currentThreshold: number,
): number {
  let sum = 0;
  let count = 0;

  for (const val of values) {
    if (val <= currentThreshold) {
      sum += val;
      count++;
    }
  }

  if (count === 0) return currentThreshold;

  const mean = sum / count;
  let varianceSum = 0;

  for (const val of values) {
    if (val <= currentThreshold) {
      const diff = val - mean;
      varianceSum += diff * diff;
    }
  }

  const std = Math.sqrt(varianceSum / count);
  return mean + factor * std;
}

function erodeMask(mask: Uint8Array, radius: number): Uint8Array {
  const length = mask.length;
  const result = new Uint8Array(length);
  const windowSize = 2 * radius + 1;
  const threshold = windowSize / 2;

  for (let i = 0; i < length; i++) {
    if (mask[i] === 0) continue;

    let trueCount = 0;
    for (let offset = -radius; offset <= radius; offset++) {
      const index = i + offset;
      if (index >= 0 && index < length && mask[index] === 1) {
        trueCount++;
      }
    }
    // Result is 1 only if majority of window is 1
    result[i] = trueCount > threshold ? 1 : 0;
  }

  return result;
}

function getSignal(
  data: DataXReIm,
  component: 're' | 'im' | 'magnitude',
): DoubleArray {
  // Validate component when im is not provided

  const { re, im } = data;
  switch (component) {
    case 'im':
      return im;
    case 'magnitude': {
      const magnitude = new Float64Array(re.length);
      for (let i = 0; i < re.length; i++) {
        magnitude[i] = Math.hypot(re[i], im[i]);
      }
      return magnitude;
    }
    case 're':
      return re;
    default:
      return re;
  }
}

function resolveScale(
  length: number,
  scale: AutomaticBaselineRecognitionOptions['scale'],
): number {
  if (typeof scale === 'number') {
    return Math.max(
      1,
      Math.min(Math.floor(scale), Math.floor((length - 1) / 2)),
    );
  }
  return Math.max(1, Math.floor(length / 512));
}
