import { DataXY, FromTo, NumberArray } from 'cheminfo-types';
// @ts-expect-error Missing types.
import SplineInterpolator from 'spline-interpolator';

import { createFromToArray } from '../utils';

import erfcinv from './utils/erfcinv';
import rayleighCdf from './utils/rayleighCdf';
import { xCheck } from './xCheck';

export interface XNoiseSanPlotOptions {
  /**
   * boolean array to filter data, if the i-th element is true then the i-th element of the distribution will be ignored.
   */
  mask?: NumberArray;

  /**
   * percent of positive signal distribution where the noise level will be determined, if it is not defined the program calculate it.
   */
  cutOff?: number;

  /**
   * true the noise level will be recalculated get out the signals using factorStd.
   * @default true
   */
  refine?: boolean;
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

  let input;
  if (Array.isArray(mask) && mask.length === array.length) {
    input = new Float64Array(array.filter((_e, i) => !mask[i]));
  } else {
    input = new Float64Array(array);
  }

  xCheck(input);

  if (scaleFactor > 1) {
    for (let i = 0; i < input.length; i++) {
      input[i] *= scaleFactor;
    }
  }
  input = input.sort().reverse();

  if (fixOffset && !magnitudeMode) {
    const medianIndex = Math.floor(input.length / 2);
    const median = 0.5 * (input[medianIndex] + input[medianIndex + 1]);
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
 * DetermineCutOff.
 * @param signPositive - Array of numbers.
 * @param [options = {}] - Options.
 * @param [options.mask] - Boolean array to filter data, if the i-th element is true then the i-th element of the distribution will be ignored.
 * @param [options.scaleFactor=1] - Factor to scale the data input[i]*=scaleFactor.
 * @param [options.cutOff] - Percent of positive signal distribution where the noise level will be determined, if it is not defined the program calculate it.
 * @param [options.factorStd=5] - Factor times std to determine what will be marked as signals.
 * @param [options.refine=true] - If true the noise level will be recalculated get out the signals using factorStd.
 * @param [options.fixOffset=true] - If the baseline is correct, the midpoint of distribution should be zero. If true, the distribution will be centered.
 * @param [options.logBaseY=2] - Log scale to apply in the intensity axis in order to avoid big numbers.
 * @param options.magnitudeMode -
 * @param options.considerList -
 * @param options.considerList.from -
 * @param options.considerList.step -
 * @param options.considerList.to -
 * @param options.fromTo -
 * @returns Result.
 */
function determineCutOff(
  signPositive: NumberArray,
  options: {
    mask?: NumberArray;
    cutOff?: number;
    refine?: boolean;
    magnitudeMode?: boolean;
    scaleFactor?: number;
    factorStd?: number;
    fixOffset?: boolean;
    logBaseY?: number;
    considerList?: { from: number; step: number; to: number };

    fromTo?: Record<string, FromTo>;
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
    const averageValue = elementsOfCutOff.reduce(
      (a, b) => a + Math.abs(b[1]),
      0,
    );
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

interface SimpleNormInvOptions {
  /**
   * Boolean array to filter data, if the i-th element is true then the i-th element of the distribution will be ignored.
   */
  mask?: NumberArray;

  /**
   * Percent of positive signal distribution where the noise level will be determined, if it is not defined the program calculate it.
   */
  cutOff?: number;

  /**
   * If true the noise level will be recalculated get out the signals using factorStd.
   * @default true
   */
  refine?: boolean;
  magnitudeMode?: boolean;

  /**
   * Factor to scale the data input[i]*=scaleFactor.
   * @default 1
   */
  scaleFactor?: number;

  /**
   * Factor times std to determine what will be marked as signals.
   * @default 5
   */
  factorStd?: number;

  /**
   * If the baseline is correct, the midpoint of distribution should be zero. If true, the distribution will be centered.
   * @default true
   */
  fixOffset?: boolean;

  /**
   * Log scale to apply in the intensity axis in order to avoid big numbers.
   * @default 2
   */
  logBaseY?: number;
  considerList?: { from: number; step: number; to: number };
  fromTo?: Record<string, FromTo>;
}

function simpleNormInvNumber(
  data: number,
  options: SimpleNormInvOptions,
): number {
  return simpleNormInv([data], options)[0];
}

/**
 * SimpleNormInvs.
 * @param data - Data array.
 * @param options
 */
function simpleNormInv(
  data: NumberArray,
  options: SimpleNormInvOptions = {},
): Float64Array {
  const { magnitudeMode = false } = options;

  const from = 0;
  const to = 2;
  const step = 0.01;
  const xTraining = createArray(from, to, step);

  const result = new Float64Array(data.length);
  const yTraining = new Float64Array(xTraining.length);
  if (magnitudeMode) {
    const factor = 1;
    for (let i = 0; i < yTraining.length; i++) {
      const finalInput = xTraining[i] * factor;
      yTraining[i] = 1 - rayleighCdf(finalInput);
    }
    const interp = new SplineInterpolator(xTraining, yTraining);
    for (let i = 0; i < result.length; i++) {
      const yValue = 2 * data[i];
      result[i] = -1 * interp.interpolate(yValue);
    }
  } else {
    for (let i = 0; i < result.length; i++) {
      result[i] = -1 * Math.SQRT2 * erfcinv(2 * data[i]);
    }
  }
  return result;
}

/**
 * CreateArray.
 * @param from - From.
 * @param to - To.
 * @param step - Step.
 * @returns Array of results.
 */
function createArray(from: number, to: number, step: number): number[] {
  const length = Math.abs((from - to) / step + 1);
  const result: number[] = [];
  for (let i = 0; i < length; i++) {
    result.push(from + i * step);
  }
  return result;
}

/**
 * GenerateSanPlot.
 * @param array - Array.
 * @param [options = {}] - Options.
 * @param [options.mask] - Boolean array to filter data, if the i-th element is true then the i-th element of the distribution will be ignored.
 * @param [options.scaleFactor=1] - Factor to scale the data input[i]*=scaleFactor.
 * @param [options.cutOff] - Percent of positive signal distribution where the noise level will be determined, if it is not defined the program calculate it.
 * @param [options.factorStd=5] - Factor times std to determine what will be marked as signals.
 * @param [options.refine=true] - If true the noise level will be recalculated get out the signals using factorStd.
 * @param [options.fixOffset=true] - If the baseline is correct, the midpoint of distribution should be zero. If true, the distribution will be centered.
 * @param [options.logBaseY=2] - Log scale to apply in the intensity axis in order to avoid big numbers.
 * @param options.magnitudeMode -
 * @param options.considerList -
 * @param options.considerList.from -
 * @param options.considerList.step -
 * @param options.considerList.to -
 * @param options.fromTo -
 * @returns Results.
 */
function generateSanPlot(
  array: NumberArray,
  options: {
    mask?: NumberArray;
    cutOff?: number;
    refine?: boolean;
    magnitudeMode?: boolean;
    scaleFactor?: number;
    factorStd?: number;
    fixOffset?: boolean;
    logBaseY?: number;
    considerList?: { from: number; step: number; to: number };

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
 * Scale.
 * @param array - Array.
 * @param [options = {}] - Options.
 * @param [options.mask] - Boolean array to filter data, if the i-th element is true then the i-th element of the distribution will be ignored.
 * @param [options.scaleFactor=1] - Factor to scale the data input[i]*=scaleFactor.
 * @param [options.cutOff] - Percent of positive signal distribution where the noise level will be determined, if it is not defined the program calculate it.
 * @param [options.factorStd=5] - Factor times std to determine what will be marked as signals.
 * @param [options.refine=true] - If true the noise level will be recalculated get out the signals using factorStd.
 * @param [options.fixOffset=true] - If the baseline is correct, the midpoint of distribution should be zero. If true, the distribution will be centered.
 * @param [options.logBaseY=2] - Log scale to apply in the intensity axis in order to avoid big numbers.
 * @param options.magnitudeMode -
 * @param options.considerList -
 * @param options.considerList.from -
 * @param options.considerList.step -
 * @param options.considerList.to -
 * @param options.fromTo -
 * @returns Results.
 */
function scale(
  array: NumberArray,
  options: {
    mask?: NumberArray;
    cutOff?: number;
    refine?: boolean;
    magnitudeMode?: boolean;
    scaleFactor?: number;
    factorStd?: number;
    fixOffset?: boolean;
    logBaseY?: number;
    considerList?: { from: number; step: number; to: number };

    fromTo?: Record<string, FromTo>;
  } = {},
) {
  const { log10, abs } = Math;
  const { logBaseY } = options;
  if (logBaseY) {
    array = array.slice();
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
