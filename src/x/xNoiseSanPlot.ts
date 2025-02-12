import type { DataXY, FromTo, NumberArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';

import { createFromToArray } from '../utils';

import { simpleNormInvNumber } from './utils/simpleNormInv';
import { xEnsureFloat64 } from './xEnsureFloat64';

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
    cutOff,
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
  const signNegative = input.slice(firstNegativeValueIndex);

  const cutOffDist = cutOff || determineCutOff(signPositive, { magnitudeMode });

  const pIndex = Math.floor(signPositive.length * cutOffDist);
  const initialNoiseLevelPositive = signPositive[pIndex];

  const skyPoint = signPositive[0];

  let initialNoiseLevelNegative;
  if (signNegative.length > 0) {
    const nIndex = Math.floor(signNegative.length * (1 - cutOffDist));
    initialNoiseLevelNegative = -1 * signNegative[nIndex];
  } else {
    initialNoiseLevelNegative = 0;
  }

  let noiseLevelPositive = initialNoiseLevelPositive;
  let noiseLevelNegative = initialNoiseLevelNegative;
  let cloneSignPositive = signPositive.slice();
  let cloneSignNegative = signNegative.slice();

  let cutOffSignalsIndexPlus = 0;
  let cutOffSignalsIndexNeg = 2;
  if (refine) {
    let cutOffSignals = noiseLevelPositive * factorStd;
    cutOffSignalsIndexPlus = signPositive.findIndex((e) => e < cutOffSignals);

    if (cutOffSignalsIndexPlus > -1) {
      cloneSignPositive = signPositive.slice(cutOffSignalsIndexPlus);
      noiseLevelPositive =
        cloneSignPositive[Math.floor(cloneSignPositive.length * cutOffDist)];
    }

    cutOffSignals = noiseLevelNegative * factorStd;
    cutOffSignalsIndexNeg = signNegative.findIndex((e) => e < cutOffSignals);
    if (cutOffSignalsIndexNeg > -1) {
      cloneSignNegative = signNegative.slice(cutOffSignalsIndexNeg);
      noiseLevelNegative =
        cloneSignPositive[
          Math.floor(cloneSignNegative.length * (1 - cutOffDist))
        ];
    }
  }

  const correctionFactor = -simpleNormInvNumber(cutOffDist / 2, {
    magnitudeMode,
  });
  let effectiveCutOffDist, refinedCorrectionFactor;

  if (refine && cutOffSignalsIndexPlus > -1) {
    effectiveCutOffDist =
      (cutOffDist * cloneSignPositive.length + cutOffSignalsIndexPlus) /
      (cloneSignPositive.length + cutOffSignalsIndexPlus);
    refinedCorrectionFactor =
      -1 * simpleNormInvNumber(effectiveCutOffDist / 2, { magnitudeMode });

    noiseLevelPositive /= refinedCorrectionFactor;

    if (cutOffSignalsIndexNeg > -1) {
      effectiveCutOffDist =
        (cutOffDist * cloneSignNegative.length + cutOffSignalsIndexNeg) /
        (cloneSignNegative.length + cutOffSignalsIndexNeg);
      refinedCorrectionFactor =
        -1 * simpleNormInvNumber(effectiveCutOffDist / 2, { magnitudeMode });
      if (noiseLevelNegative !== 0) {
        noiseLevelNegative /= refinedCorrectionFactor;
      }
    }
  } else {
    noiseLevelPositive /= correctionFactor;
    noiseLevelNegative /= correctionFactor;
  }

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

/**
 * Determines the optimal cut-off point for a given array of positive numbers.
 * @param signPositive - An array of positive numbers.
 * @param options - Optional parameters to configure the cut-off determination.
 * @param options.magnitudeMode - If true, uses magnitude mode for normalization. Default is false.
 * @param options.considerList - An object specifying the range and step for consideration.
 * @param options.considerList.from - The starting point of the range. Default is 0.5.
 * @param options.considerList.step - The step size for the range. Default is 0.1.
 * @param options.considerList.to - The ending point of the range. Default is 0.9.
 * @returns The optimal cut-off point as a number.
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
  //generate a list of values for
  const cutOff = [];
  const indexMax = signPositive.length - 1;
  for (let i = 0.01; i <= 0.99; i += 0.01) {
    const index = Math.round(indexMax * i);
    const value =
      -signPositive[index] / simpleNormInvNumber(i / 2, { magnitudeMode });
    cutOff.push([i, value]);
  }

  let minKi = Number.MAX_SAFE_INTEGER;
  const { from, to, step } = considerList;
  const delta = step / 2;
  let whereToCutStat = 0.5;
  for (let i = from; i <= to; i += step) {
    const floor = i - delta;
    const top = i + delta;
    const elementsOfCutOff = cutOff.filter((e) => e[0] < top && e[0] > floor);
    let averageValue = 0;
    for (const element of elementsOfCutOff) {
      averageValue += Math.abs(element[1]);
    }
    let kiSqrt = 0;
    for (const element of elementsOfCutOff) {
      kiSqrt += (element[1] - averageValue) ** 2;
    }

    if (kiSqrt < minKi) {
      minKi = kiSqrt;
      whereToCutStat = i;
    }
  }

  return whereToCutStat;
}

/**
 * Generates a SAN plot from the given array based on the specified options.
 * @param array - The input array of numbers to be processed.
 * @param options - An optional object containing configuration options.
 * @param options.logBaseY - The logarithmic base for the Y-axis. Defaults to 2.
 * @param options.fromTo - An object specifying the range for each key. Each key maps to an object with `from` and `to` properties.
 * @returns An object where each key maps to a DataXY object containing the processed data.
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
 * @param array - The input array to be scaled.
 * @param options - An optional object containing scaling options.
 * @param options.logBaseY - If provided, the array values will be scaled using the logarithm of this base.
 * @returns An object containing the scaled x and y arrays.
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
 * @param array - The input array of numbers to be processed.
 * @param options - An object containing the following properties:
 *   - scaleFactor: A number by which to scale each element of the array.
 *   - mask: An optional array of the same length as the input array, where
 *           elements corresponding to `true` values will be excluded from processing.
 * @param options.scaleFactor
 * @param options.mask
 * @returns A new Float64Array containing the processed data, scaled by the
 *          scaleFactor and sorted in descending order.
 */
function prepareData(
  array: NumberArray,
  options: { scaleFactor: number; mask?: NumberArray },
): Float64Array {
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

  return input.sort().reverse();
}
