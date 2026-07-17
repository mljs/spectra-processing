import type { DataXY, FromTo, NumberArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';

import { createFromToArray } from '../utils/index.ts';

import { simpleNormInvMagnitude } from './utils/simpleNormInvMagnitude.ts';
import { simpleNormInvRaw } from './utils/simpleNormInvRaw.ts';
import { xEnsureFloat64 } from './xEnsureFloat64.ts';

export interface XNoiseSanPlotOptions {
  /**
   * array to filter data, if the i-th element is different to zero then the i-th element of the distribution will be ignored.
   * @default undefined
   */
  mask?: NumberArray;

  /**
   * percent of positive signal distribution where the noise level will be determined, if it is not defined the program calculate it.
   * @default: will be calculated from the data.
   */
  cutOff?: number;
  /**
   * if true the cutOff will be calculated from the positive distribution, if false it will be calculated from the negative distribution.
   * @default true
   */
  cutOffFromPositive?: boolean;

  /**
   * true the noise level will be recalculated get out the signals using factorStd.
   * @default true
   */
  refine?: boolean;
  /**
   * If true the returns values will be calculated from the Rayleigh inverse cumulative distribution.
   * it returns
   * @default false
   */
  magnitudeMode?: boolean;

  /**
   * factor to scale the data input[i]*=scaleFactor.
   * @default 1
   */
  scaleFactor?: number;

  /**
   * factor times std to determine what will be marked as signals.
   * @default 5
   */
  factorStd?: number;

  /**
   * If the baseline is correct, the midpoint of distribution should be zero. if true, the distribution will be centered.
   * @default true
   */
  fixOffset?: boolean;

  /**
   * log scale to apply in the intensity axis in order to avoid big numbers.
   * @default 2
   */
  logBaseY?: number;
  considerList?: { from: number; step: number; to: number };

  fromTo?: Record<string, FromTo>;
}

export interface XNoiseSanPlotResult {
  positive: number;
  negative: number;
  snr: number;
  sanplot: Record<string, DataXY>;
}

/**
 * Determine noise level by san plot methodology (https://doi.org/10.1002/mrc.4882)
 * @param array - real or magnitude spectra data.
 * @param options - options
 * @returns noise level
 */

export function xNoiseSanPlot(
  array: NumberArray,
  options: XNoiseSanPlotOptions = {},
): XNoiseSanPlotResult {
  const {
    mask,
    cutOffFromPositive = true,
    refine = true,
    magnitudeMode = false,
    scaleFactor = 1,
    factorStd = 5,
    fixOffset = true,
  } = options;

  const input = prepareData(array, { scaleFactor, mask });

  if (fixOffset && !magnitudeMode) {
    const medianIndex = Math.floor(input.length / 2);
    const median =
      input.length % 2 === 0
        ? 0.5 * (input[medianIndex - 1] + input[medianIndex])
        : input[medianIndex];

    for (let i = 0; i < input.length; i++) {
      input[i] -= median;
    }
  }

  const firstNegativeValueIndex =
    (input.at(-1) as number) >= 0
      ? input.length
      : input.findIndex((e) => e < 0);
  let lastPositiveValueIndex = firstNegativeValueIndex - 1;
  for (let i = lastPositiveValueIndex; i >= 0; i--) {
    if (input[i] > 0) {
      lastPositiveValueIndex = i;
      break;
    }
  }

  const signPositive = input.slice(0, lastPositiveValueIndex + 1);
  const signNegative = createNegativeSign(input, firstNegativeValueIndex);

  const skyPoint = signPositive[0];

  const cutOff =
    options.cutOff ??
    (cutOffFromPositive
      ? determineCutOff(signPositive, { magnitudeMode })
      : null);

  const noiseLevelPositive = calculateNoiseLevel(signPositive, {
    factorStd,
    refine,
    magnitudeMode,
    cutOff,
  });

  const noiseLevelNegative = calculateNoiseLevel(signNegative, {
    factorStd,
    refine,
    magnitudeMode,
    cutOff,
  });

  return {
    positive: noiseLevelPositive,
    negative: noiseLevelNegative,
    snr: skyPoint / noiseLevelPositive,
    sanplot: generateSanPlot(input, {
      fromTo: {
        positive: { from: 0, to: lastPositiveValueIndex },
        negative: { from: firstNegativeValueIndex, to: input.length },
      },
    }),
  };
}

function calculateNoiseLevel(
  sign: NumberArray,
  options: {
    factorStd: number;
    refine: boolean;
    magnitudeMode: boolean;
    cutOff: number | null;
  },
): number {
  const { factorStd, refine, magnitudeMode, cutOff } = options;

  if (sign.length === 0) return 0;

  const simpleNormInvValue = magnitudeMode
    ? simpleNormInvMagnitude
    : simpleNormInvRaw;

  const cutOffDist = cutOff || determineCutOff(sign, { magnitudeMode });

  let noiseLevel = sign[Math.floor(sign.length * cutOffDist)];
  let cloneSign = sign.slice();
  let cutOffSignalsIndex = -1;

  if (refine) {
    const cutOffSignals = noiseLevel * factorStd;
    cutOffSignalsIndex = sign.findIndex((e) => e < cutOffSignals);

    if (cutOffSignalsIndex > -1) {
      cloneSign = sign.slice(cutOffSignalsIndex);
      noiseLevel = cloneSign[Math.floor(cloneSign.length * cutOffDist)];
    }
  }

  if (refine && cutOffSignalsIndex > -1) {
    const effectiveCutOffDist =
      (cutOffDist * cloneSign.length + cutOffSignalsIndex) /
      (cloneSign.length + cutOffSignalsIndex);
    const refinedCorrectionFactor =
      -1 * simpleNormInvValue(effectiveCutOffDist / 2);
    noiseLevel /= refinedCorrectionFactor;
  } else {
    const correctionFactor = -simpleNormInvValue(cutOffDist / 2);
    noiseLevel /= correctionFactor;
  }

  return noiseLevel;
}

/**
 * Estimates where the "noise region" begins in a SAN-plot-style sorted
 * intensity series (Sheberstov et al., Magn. Reson. Chem. 2020, 58, 466-472,
 * https://doi.org/10.1002/mrc.4882).
 *
 * `signPositive` is expected to already be sorted by decreasing absolute
 * magnitude (the paper's S+ or S- series). For each quantile fraction `i`
 * (fraction of points at or beyond that position, counting from the tail),
 * we invert the Gaussian (or Rayleigh, in magnitude mode) order-statistics
 * relationship to get a local estimate of the noise standard deviation
 * (sigma). This estimate is only expected to be stable/flat once we are
 * fully inside the true noise region; in the signal and artifact regions
 * it will be biased and noisy. We therefore scan candidate quantile windows
 * and pick the one where the sigma estimates are most self-consistent
 * (lowest variance) - a proxy for "where the noise region reliably starts".
 * <<<<<<< Updated upstream
 *
 * =======
 * >>>>>>> Stashed changes
 * @param signPositive - an array of positive numbers.
 * @param options - optional parameters to configure the cut-off determination.
 * @param options.magnitudeMode - if true, uses magnitude mode for normalization. Default is false.
 * @param options.considerList - an object specifying the range and step for consideration.
 * @param options.considerList.from - the starting point of the range. Default is 0.5.
 * @param options.considerList.step - the step size for the range. Default is 0.1.
 * @param options.considerList.to - the ending point of the range. Default is 0.9.
 * @returns the optimal cut-off point as a number.
 */

function determineCutOff(
  signPositive: NumberArray,
  options: {
    magnitudeMode?: boolean;
    considerList?: { from: number; step: number; to: number };
  } = {},
): number {
  const {
    magnitudeMode = false,
    considerList = { from: 0.5, step: 0.1, to: 0.9 },
  } = options;

  const inverseQuantileFn = magnitudeMode
    ? simpleNormInvMagnitude
    : simpleNormInvRaw;

  const indexMax = signPositive.length - 1;

  // For each quantile fraction, compute a local sigma estimate by inverting
  // the theoretical relationship between order statistics and the assumed
  // noise distribution (Gaussian or Rayleigh).
  const sigmaEstimates: Array<[quantileFraction: number, sigma: number]> = [];
  for (
    let quantileFraction = 0.01;
    quantileFraction <= 0.99;
    quantileFraction += 0.01
  ) {
    const index = Math.round(indexMax * quantileFraction);
    const sigma =
      -signPositive[index] / inverseQuantileFn(quantileFraction / 2);
    sigmaEstimates.push([quantileFraction, Math.abs(sigma)]);
  }

  const { from, to, step } = considerList;
  const halfWindow = step / 2;

  let bestVariance = Number.MAX_SAFE_INTEGER;
  let bestQuantileFraction = 0.5;

  for (let windowCenter = from; windowCenter <= to; windowCenter += step) {
    const windowFloor = windowCenter - halfWindow;
    const windowTop = windowCenter + halfWindow;

    let count = 0;
    let sum = 0;

    // First pass: compute mean
    for (const [q, absSigma] of sigmaEstimates) {
      if (q > windowFloor && q < windowTop) {
        sum += absSigma;
        count++;
      }
    }

    // Guard against empty windows.
    if (count === 0) continue;

    const meanSigma = sum / count;

    // Second pass: compute variance
    let variance = 0;
    for (const [q, absSigma] of sigmaEstimates) {
      if (q > windowFloor && q < windowTop) {
        variance += (absSigma - meanSigma) ** 2;
      }
    }

    if (variance < bestVariance) {
      bestVariance = variance;
      bestQuantileFraction = windowCenter;
    }
  }

  return bestQuantileFraction;
}

/**
 * Generates a SAN plot from the given array based on the specified options.
 * @param array - the input array of numbers to be processed.
 * @param options - an optional object containing configuration options.
 * @param options.logBaseY - the logarithmic base for the Y-axis. Defaults to 2.
 * @param options.fromTo - an object specifying the range for each key. Each key maps to an object with `from` and `to` properties.
 * @returns an object where each key maps to a DataXY object containing the processed data.
 */
function generateSanPlot(
  array: NumberArray,
  options: {
    logBaseY?: number;
    fromTo?: Record<string, FromTo>;
  } = {},
) {
  const { fromTo, logBaseY = 2 } = options;

  const sanplot: Record<string, DataXY> = {};
  for (const key in fromTo) {
    const { from, to } = fromTo[key];
    sanplot[key] =
      from !== to
        ? scale(array.slice(from, to), {
            logBaseY,
          })
        : { x: [], y: [] };
    if (key === 'negative') {
      sanplot[key].y.reverse();
    }
  }
  return sanplot;
}

/**
 * Scales the input array based on the provided options.
 * @param array - the input array to be scaled.
 * @param options - an optional object containing scaling options.
 * @param options.logBaseY - if provided, the array values will be scaled using the logarithm of this base.
 * @returns an object containing the scaled x and y arrays.
 */
function scale(
  array: NumberArray,
  options: {
    logBaseY?: number;
  } = {},
) {
  const { log10, abs } = Math;
  const { logBaseY } = options;
  if (logBaseY) {
    array = array.slice(0);
    const logOfBase = log10(logBaseY);
    for (let i = 0; i < array.length; i++) {
      array[i] = log10(abs(array[i])) / logOfBase;
    }
  }

  const xAxis = createFromToArray({
    from: 0,
    to: array.length - 1,
    length: array.length,
  });

  return { x: xAxis, y: array };
}

/**
 * Prepares and processes the input data array based on the provided options.
 * @param array - the input array of numbers to be processed.
 * @param options - an object containing the following properties:
 *   - scaleFactor: A number by which to scale each element of the array.
 *   - mask: An optional array of the same length as the input array, where
 *           elements corresponding to `true` values will be excluded from processing.
 * @param options.scaleFactor
 * @param options.mask
 * @param from
 * @returns A new Float64Array containing the processed data, scaled by the
 *          scaleFactor and sorted in descending order.
 */
function createNegativeSign(array: Float64Array, from: number): Float64Array {
  const length = array.length - from;
  const result = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    result[i] = -array[array.length - 1 - i];
  }
  return result;
}

function prepareData(
  array: NumberArray,
  options: { scaleFactor: number; mask?: NumberArray },
): Float64Array<ArrayBuffer> {
  const { scaleFactor, mask } = options;

  const input = xEnsureFloat64(
    isAnyArray(mask) && mask.length === array.length
      ? array.filter((_e, i) => !mask[i])
      : array,
  );

  if (scaleFactor > 1) {
    for (let i = 0; i < input.length; i++) {
      input[i] *= scaleFactor;
    }
  }

  input.sort();
  input.reverse();

  return input;
}
