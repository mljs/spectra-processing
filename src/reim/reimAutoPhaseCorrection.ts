import { DoubleArray } from 'cheminfo-types';

import { DataReIm } from '../types';
import { xNoiseSanPlot } from '../x';

import { reimAbsolute } from './reimAbsolute';
import { reimPhaseCorrection } from './reimPhaseCorrection';

export interface AutoPhaseCorrectionOptions {
  /**
   * if true it uses magnitude spectrum.boolean
   * @default true
   */
  magnitudeMode?: boolean;

  /**
   * min number of points to auto phase a region
   * @default 30
   */
  minRegSize?: number;

  /**
   * max distance between regions (in number of points) to join two regions
   * @default 256
   */
  maxDistanceToJoin?: number;

  /**
   * scale the cutoff like factorStd * noiseLevel
   * @default 3
   */
  factorNoise?: number;

  /**
   * Apply the phase correction from the last element of the array
   * @default false
   */
  reverse?: boolean;
}

/**
 * Implementation of the algorithm for automatic phase correction: A robust, general automatic phase
 * correction algorithm for high-resolution NMR data. 10.1002/mrc.4586
 * @param data - complex spectrum
 * @param options - options
 */

export function reimAutoPhaseCorrection(
  data: DataReIm,
  options: AutoPhaseCorrectionOptions = {},
): { data: DataReIm<Float64Array>; ph0: number; ph1: number } {
  const {
    magnitudeMode = true,
    minRegSize = 30,
    factorNoise = 3,
    maxDistanceToJoin = 256,
    reverse = false,
  } = options;

  const finalPeaks = detectBaselineRegions(data, {
    maxDistanceToJoin,
    magnitudeMode,
    factorNoise,
  });

  const { re, im } = data;
  const length = re.length;
  const indexMask = reverse ? (i: number) => length - 1 - i : (i: number) => i;
  let x0 = 0;
  let counter = -1;
  const res: AutoPhaseRegionResult[] = [];
  while (counter < length) {
    const reTmp: number[] = [];
    const imTmp: number[] = [];
    while (!finalPeaks[indexMask(++counter)] && counter < length) {
      // Add some extra points(0.1 ppm) at rigth and left sides of the region.
      x0 = counter;
    }
    for (; finalPeaks[indexMask(counter)] && counter < length; counter += 2) {
      reTmp.push(re[indexMask(counter)]);
      imTmp.push(im[indexMask(counter)]);
    }

    if (reTmp.length > minRegSize) {
      res.push(autoPhaseRegion(reTmp, imTmp, x0));
    }
  }

  const { ph1, ph0 } = determiningGlobalValues(
    res.map((r) => r.x0 / length),
    res.map((r) => r.ph0),
    res.map((r) => r.area / 1e11),
  );

  const phased = reimPhaseCorrection(
    { re, im },
    toRadians(ph0),
    toRadians(ph1),
    { reverse },
  );

  return { data: phased, ph0, ph1 };
}

function determiningGlobalValues(
  x: number[],
  ph0Values: number[],
  weights: number[],
): { ph0: number; ph1: number } {
  if (x.length === 0) {
    return { ph0: 0, ph1: 0 };
  } else if (x.length === 1) {
    return { ph0: ph0Values[0], ph1: 0 };
  }
  const [ph1, ph0] = weightedLinearRegression(x, ph0Values, weights);
  let indexMax = -1;
  let maxDiff = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < x.length; i++) {
    const predictedPh0 = x[i] * ph1 + ph0;
    const diff = Math.abs(ph0Values[i] - predictedPh0);
    if (diff > 34 && maxDiff < diff) {
      indexMax = i;
      maxDiff = diff;
    }
  }

  if (indexMax > -1) {
    x.splice(indexMax, 1);
    ph0Values.splice(indexMax, 1);
    weights.splice(indexMax, 1);
    return determiningGlobalValues(x, ph0Values, weights);
  }
  return { ph0, ph1 };
}

function detectBaselineRegions(
  data: DataReIm,
  options: Required<
    Pick<
      AutoPhaseCorrectionOptions,
      'magnitudeMode' | 'maxDistanceToJoin' | 'factorNoise'
    >
  >,
): Uint8Array {
  const magnitudeData = options.magnitudeMode ? reimAbsolute(data) : data.re;

  const ds = holoborodko(magnitudeData);
  const peaksDs = robustBaseLineRegionsDetection(ds, options);
  const peaksSp = robustBaseLineRegionsDetection(magnitudeData, options);

  return peaksSp.map((sp, i) => sp && peaksDs[i]);
}

interface AutoPhaseRegionResult {
  ph0: number;
  area: number;
  x0: number;
}

/**
 * AutoPhaseRegion.
 * @param re - Array of Number.
 * @param im - Array of Number.
 * @param x0 - Number.
 * @returns Region.
 */
function autoPhaseRegion(
  re: DoubleArray,
  im: DoubleArray,
  x0: number,
): AutoPhaseRegionResult {
  let start = -180;
  let stop = 180;
  const nSteps = 6;
  let maxSteps = 10;

  let bestAng = 0;
  let minArea = Number.MAX_SAFE_INTEGER;
  while (maxSteps > 0) {
    const dAng = (stop - start) / (nSteps + 1);
    for (let i = start; i <= stop; i += dAng) {
      const tmpPhased = reimPhaseCorrection({ re, im }, toRadians(i), 0);
      const negArea = getNegArea(tmpPhased.re);
      if (negArea < minArea) {
        [minArea, bestAng] = [negArea, i];
      }
    }
    start = bestAng - dAng;
    stop = bestAng + dAng;
    maxSteps--;
  }

  // Calculate the area for the best angle
  const phased = reimPhaseCorrection({ re, im }, toRadians(bestAng), 0);
  let area = 0;
  let sumX = 0;
  for (let j = 0; j < re.length; j++) {
    area += phased.re[j];
    sumX += phased.re[j] * (j + x0);
  }

  return { ph0: bestAng, area, x0: sumX / area };
}

/**
 * Holoborodko.
 * @param s - Array of float.
 * @returns Array of float.
 */
function holoborodko(s: DoubleArray): Float64Array {
  const dk = new Float64Array(s.length);
  for (let i = 5; i < s.length - 5; i++) {
    dk[i] =
      (42 * (s[i + 1] - s[i - 1]) +
        48 * (s[i + 2] - s[i - 2]) +
        27 * (s[i + 3] + s[i - 3]) +
        8 * (s[i + 4] - s[i - 4]) +
        s[i + 5] -
        s[i - 5]) /
      512;
  }
  //Fill the borders
  for (let i = 0; i < 5; i++) {
    dk[i] = dk[5];
    dk[s.length - i - 1] = dk[s.length - 6];
  }

  return dk;
}

/**
 * RobustBaseLineRegionsDetection.
 * @param s
 * @param options
 * @param options.magnitudeMode
 * @param options.maxDistanceToJoin
 * @param options.factorNoise
 */
function robustBaseLineRegionsDetection(
  s: DoubleArray,
  options: {
    magnitudeMode: boolean;
    maxDistanceToJoin: number;
    factorNoise: number;
  },
): Uint8Array {
  const { maxDistanceToJoin, magnitudeMode, factorNoise } = options;

  const mask = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) {
    mask[i] = 0;
  }

  let change = true;
  while (change) {
    const noiseLevel = xNoiseSanPlot(s, { magnitudeMode });
    const cutOff = factorNoise * noiseLevel.positive;
    change = false;
    for (let i = 0; i < s.length; i++) {
      if (Math.abs(s[i]) > cutOff && !mask[i]) {
        change = true;
        mask[i] = 1;
      }
    }
  }
  // Clean up mask by merging peaks blocks, separated by just a few points(4??).
  let count = 0;
  let prev = 0;
  for (let i = 0; i < s.length; i++) {
    if (!mask[i]) {
      count++;
    } else {
      if (count < maxDistanceToJoin) {
        for (let j = 0; j <= count; j++) {
          mask[prev + j] = 1;
        }
      }
      while (mask[++i] && i < s.length);
      prev = i;
      count = 0;
    }
  }

  return mask;
}

/**
 * WeightedLinearRegression.
 * @param x
 * @param y
 * @param w
 */
function weightedLinearRegression(
  x: DoubleArray,
  y: DoubleArray,
  w: DoubleArray,
): [number, number] {
  let sxtw = 0;
  let swx = 0;
  let sw = 0;
  let sxtwy = 0;
  let swy = 0;
  for (let i = 0; i < x.length; i++) {
    sxtw += x[i] * x[i] * w[i];
    swx += x[i] * w[i];
    sw += w[i];
    sxtwy += x[i] * w[i] * y[i];
    swy += w[i] * y[i];
  }

  /* Just to know what is the matrix system that we solve
   let Mx=[[sxtw, swx], [swx, sw]];
   let My=[[sxtwy], [swy]];
  */

  //Mx inverse
  const detMx = sxtw * sw - swx * swx;
  const inMx = [
    [sw / detMx, -swx / detMx],
    [-swx / detMx, sxtw / detMx],
  ];

  return [
    inMx[0][0] * sxtwy + inMx[0][1] * swy,
    inMx[1][0] * sxtwy + inMx[1][1] * swy,
  ];
}

function toRadians(degree: number): number {
  return (degree * Math.PI) / 180;
}

function getNegArea(data: DoubleArray): number {
  let area = 0;
  for (const element of data) {
    if (element < 0) area -= element;
  }
  return area;
}
