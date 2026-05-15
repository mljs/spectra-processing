import type { DataReIm } from '../types/index.ts';

export interface ReimPhaseCorrectionOptions {
  /**
   * Apply the phase correction from the last element of the array
   * @default false
   */
  reverse?: boolean;
  /**
   * Apply the phase correction directly in the input data
   * @default false
   */
  inPlace?: boolean;
}

/**
 * Phase correction filter.
 * @param data - complex spectrum
 * @param phi0 - Angle in radians for zero order phase correction
 * @param phi1 - Angle in radians for first order phase correction
 * @param options
 * @returns - returns a new object {re:[], im:[]} unless inPlace=true
 */
export function reimPhaseCorrection(
  data: DataReIm,
  phi0 = 0,
  phi1 = 0,
  options: ReimPhaseCorrectionOptions = {},
): DataReIm {
  const { reverse = false, inPlace = false } = options;

  phi0 = Number.isFinite(phi0) ? phi0 : 0;
  phi1 = Number.isFinite(phi1) ? phi1 : 0;

  const length = data.re.length;

  // Decide target arrays
  const re = data.re;
  const im = data.im;

  const outRe = inPlace ? re : new Float64Array(length);
  const outIm = inPlace ? im : new Float64Array(length);

  let firstAngle = phi0;
  let delta = phi1 / length;

  if (reverse) {
    delta *= -1;
    firstAngle += phi1;
  }

  const alpha = 2 * Math.sin(delta / 2) ** 2;
  const beta = Math.sin(delta);

  let cosTheta = Math.cos(firstAngle);
  let sinTheta = Math.sin(firstAngle);

  for (let i = 0; i < length; i++) {
    const r = re[i];
    const ii = im[i];

    outRe[i] = r * cosTheta - ii * sinTheta;
    outIm[i] = ii * cosTheta + r * sinTheta;

    // Recursive angle update (stable incremental rotation)
    const newCosTheta = cosTheta - (alpha * cosTheta + beta * sinTheta);
    const newSinTheta = sinTheta - (alpha * sinTheta - beta * cosTheta);

    cosTheta = newCosTheta;
    sinTheta = newSinTheta;
  }

  return { re: outRe, im: outIm };
}
