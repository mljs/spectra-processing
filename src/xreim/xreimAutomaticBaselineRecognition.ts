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

  /**
   * Deprecated alias for component.
   */
  mode?: 're' | 'im' | 'magnitude';
}

/**
 * Automatically detects signal-free regions in a 1D spectrum using an
 * approximate CWT-Haar derivative followed by iterative thresholding.
 *
 * The output is a binary mask where 1 marks points belonging to the baseline
 * (signal-free regions) and 0 marks points associated with peaks or signal.
 *
 * @param data - object of kind {x:[], re:[], im:[]}
 * @param options - recognition options
 * @returns a binary mask as a Uint8Array
 */
export function xreimAutomaticBaselineRecognition<
  ArrayType extends DoubleArray = DoubleArray,
>(
  data: DataXReIm<ArrayType>,
  options: AutomaticBaselineRecognitionOptions = {},
): Uint8Array {
  const {
    scale = 'auto',
    thresholdFactor = 0.5,
    erosionRadius = 1,
    component,
    mode,
  } = options;

  const length = data.x.length;
  if (data.re.length !== length || data.im.length !== length) {
    throw new TypeError('length of x, re and im must be identical');
  }

  const signal = getSignal(data, component ?? mode ?? 're');
  const actualScale = resolveScale(length, scale);
  const derivative = computeCwtHaarDerivative(signal, actualScale);
  const power = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    const value = derivative[i];
    power[i] = value * value;
  }

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

function getSignal<ArrayType extends DoubleArray>(
  data: DataXReIm<ArrayType>,
  component: 're' | 'im' | 'magnitude',
): DoubleArray {
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

function computeCwtHaarDerivative(
  signal: DoubleArray,
  scale: number,
): Float64Array {
  const length = signal.length;
  const derivative = new Float64Array(length);

  for (let i = scale; i < length - scale; i++) {
    let sum = 0;
    for (let j = 1; j <= scale; j++) {
      sum -= signal[i - j];
      sum += signal[i + j];
    }
    derivative[i] = sum / scale;
  }

  return derivative;
}

function iterativeThreshold(values: Float64Array, factor: number): number {
  let threshold = getThreshold(values, factor);
  let previousThreshold = Number.POSITIVE_INFINITY;

  while (Math.abs(previousThreshold - threshold) > 1e-12) {
    const valuesBelow = new Float64Array(values.length);
    let count = 0;
    for (let i = 0; i < values.length; i++) {
      if (values[i] <= threshold) {
        valuesBelow[count++] = values[i];
      }
    }

    if (count === 0) {
      return threshold;
    }

    previousThreshold = threshold;
    threshold = getThreshold(valuesBelow.subarray(0, count), factor);
  }

  return threshold;
}

function getThreshold(values: DoubleArray, factor: number): number {
  const mean = getMean(values);
  const std = getStandardDeviation(values, mean);
  return mean + factor * std;
}

function getMean(values: DoubleArray): number {
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += values[i];
  }
  return values.length === 0 ? 0 : sum / values.length;
}

function getStandardDeviation(values: DoubleArray, mean: number): number {
  if (values.length < 2) {
    return 0;
  }
  let sumSquared = 0;
  for (let i = 0; i < values.length; i++) {
    const diff = values[i] - mean;
    sumSquared += diff * diff;
  }
  return Math.sqrt(sumSquared / values.length);
}

function erodeMask(mask: Uint8Array, radius: number): Uint8Array {
  const result = new Uint8Array(mask.length);
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === 0) {
      continue;
    }

    let trueCount = 1;
    let falseCount = 0;
    for (let offset = -radius; offset <= radius; offset++) {
      if (offset === 0) continue;
      const index = i + offset;
      if (index < 0 || index >= mask.length) {
        falseCount++;
      } else if (mask[index] === 1) {
        trueCount++;
      } else {
        falseCount++;
      }
    }

    result[i] = falseCount >= trueCount ? 0 : 1;
  }

  return result;
}
