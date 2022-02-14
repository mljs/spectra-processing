import { DataXY, FromTo, DoubleArray } from 'cheminfo-types';
import SplineInterpolator from 'spline-interpolator';

import { createFromToArray } from '../utils/createFromToArray';

import erfcinv from './erfcinv';
import rayleighCdf from './rayleighCdf';

/**
 * Determine noise level by san plot methodology (https://doi.org/10.1002/mrc.4882)
 *
 * @param array - real or magnitude spectra data.
 * @param options - options
 * @returns noise level
 */

export function xNoiseSanPlot(
  array: DoubleArray,
  options: {
    /**
     * boolean array to filter data, if the i-th element is true then the i-th element of the distribution will be ignored.
     */
    mask?: DoubleArray;
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
  } = {},
): {
  positive: number;
  negative: number;
  snr: number;
  sanplot: Record<string, DataXY>;
} {
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

  if (scaleFactor > 1) {
    for (let i = 0; i < input.length; i++) {
      input[i] *= scaleFactor;
    }
  }
  input = input.sort().reverse();

  if (fixOffset && !magnitudeMode) {
    let medianIndex = Math.floor(input.length / 2);
    let median = 0.5 * (input[medianIndex] + input[medianIndex + 1]);
    for (let i = 0; i < input.length; i++) {
      input[i] -= median;
    }
  }

  let firstNegativeValueIndex =
    input[input.length - 1] >= 0 ? input.length : input.findIndex((e) => e < 0);
  let lastPositiveValueIndex = firstNegativeValueIndex - 1;
  for (let i = lastPositiveValueIndex; i >= 0; i--) {
    if (input[i] > 0) {
      lastPositiveValueIndex = i;
      break;
    }
  }

  let signPositive = input.slice(0, lastPositiveValueIndex + 1);
  let signNegative = input.slice(firstNegativeValueIndex);

  let cutOffDist = cutOff || determineCutOff(signPositive, { magnitudeMode });

  let pIndex = Math.floor(signPositive.length * cutOffDist);
  let initialNoiseLevelPositive = signPositive[pIndex];

  let skyPoint = signPositive[0];

  let initialNoiseLevelNegative;
  if (signNegative.length > 0) {
    let nIndex = Math.floor(signNegative.length * (1 - cutOffDist));
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
  let correctionFactor = -simpleNormInv(cutOffDist / 2, { magnitudeMode });
  initialNoiseLevelPositive = initialNoiseLevelPositive / correctionFactor;
  initialNoiseLevelNegative = initialNoiseLevelNegative / correctionFactor;

  let effectiveCutOffDist, refinedCorrectionFactor;

  if (refine && cutOffSignalsIndexPlus > -1) {
    effectiveCutOffDist =
      (cutOffDist * cloneSignPositive.length + cutOffSignalsIndexPlus) /
      (cloneSignPositive.length + cutOffSignalsIndexPlus);
    refinedCorrectionFactor =
      -1 *
      (simpleNormInv(effectiveCutOffDist / 2, { magnitudeMode }) as number);

    noiseLevelPositive /= refinedCorrectionFactor;

    if (cutOffSignalsIndexNeg > -1) {
      effectiveCutOffDist =
        (cutOffDist * cloneSignNegative.length + cutOffSignalsIndexNeg) /
        (cloneSignNegative.length + cutOffSignalsIndexNeg);
      refinedCorrectionFactor =
        -1 *
        (simpleNormInv(effectiveCutOffDist / 2, { magnitudeMode }) as number);
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
 *
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
  signPositive: DoubleArray,
  options: {
    mask?: DoubleArray;
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
  let {
    magnitudeMode = false,
    considerList = { from: 0.5, step: 0.1, to: 0.9 },
  } = options;
  //generate a list of values for
  let cutOff = [];
  let indexMax = signPositive.length - 1;
  for (let i = 0.01; i <= 0.99; i += 0.01) {
    let index = Math.round(indexMax * i);
    let value =
      -signPositive[index] /
      (simpleNormInv([i / 2], { magnitudeMode }) as number);
    cutOff.push([i, value]);
  }

  let minKi = Number.MAX_SAFE_INTEGER;
  let { from, to, step } = considerList;
  let delta = step / 2;
  let whereToCutStat = 0.5;
  for (let i = from; i <= to; i += step) {
    let floor = i - delta;
    let top = i + delta;
    let elementsOfCutOff = cutOff.filter((e) => e[0] < top && e[0] > floor);
    let averageValue = elementsOfCutOff.reduce((a, b) => a + Math.abs(b[1]), 0);
    let kiSqrt = 0;
    elementsOfCutOff.forEach((element) => {
      kiSqrt += Math.pow(element[1] - averageValue, 2);
    });

    if (kiSqrt < minKi) {
      minKi = kiSqrt;
      whereToCutStat = i;
    }
  }

  return whereToCutStat;
}

/**
 * SimpleNormInvs.
 *
 * @param data - Data array.
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
function simpleNormInv(
  data: DoubleArray | number,
  options: {
    mask?: DoubleArray;
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
): DoubleArray | number {
  const { magnitudeMode = false } = options;

  if (!Array.isArray(data)) data = [data as number];

  let from = 0;
  let to = 2;
  let step = 0.01;
  let xTraining = Array.from(createArray(from, to, step));

  let result = new Float64Array(data.length);
  let yTraining = new Float64Array(xTraining.length);
  if (magnitudeMode) {
    let factor = 1;
    for (let i = 0; i < yTraining.length; i++) {
      let finalInput = xTraining[i] * factor;
      yTraining[i] = 1 - rayleighCdf(finalInput);
    }
    let interp = new SplineInterpolator(xTraining, yTraining);
    for (let i = 0; i < result.length; i++) {
      let yValue = 2 * data[i];
      result[i] = -1 * interp.interpolate(yValue);
    }
  } else {
    for (let i = 0; i < result.length; i++) {
      result[i] = -1 * Math.SQRT2 * erfcinv(2 * data[i]);
    }
  }
  return result.length === 1 ? result[0] : result;
}

/**
 * CreateArray.
 *
 * @param from - From.
 * @param to - To.
 * @param step - Step.
 * @returns Array of results.
 */
function createArray(from: number, to: number, step: number): DoubleArray {
  // Changed Array to Float64Array
  let result = new Float64Array(Math.abs((from - to) / step + 1));
  for (let i = 0; i < result.length; i++) {
    result[i] = from + i * step;
  }
  return result;
}

/**
 * GenerateSanPlot.
 *
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
  array: DoubleArray,
  options: {
    mask?: DoubleArray;
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

  let sanplot: Record<string, DataXY> = {};
  for (let key in fromTo) {
    let { from, to } = fromTo[key];
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
 *
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
  array: DoubleArray,
  options: {
    mask?: DoubleArray;
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
