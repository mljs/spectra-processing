import { DataReIm } from '../types';

export interface ReimPhaseCorrectionOptions {
  reverse?: boolean;
}

/**
 * Phase correction filter.
 * @param data - complex spectrum
 * @param phi0 - Angle in radians for zero order phase correction
 * @param phi1 - Angle in radians for first order phase correction
 * @param options
 * @returns - returns a new object {re:[], im:[]}
 */
export function reimPhaseCorrection(
  data: DataReIm,
  phi0 = 0,
  phi1 = 0,
  options: ReimPhaseCorrectionOptions = {},
): DataReIm<Float64Array> {
  const { reverse = false } = options;

  phi0 = Number.isFinite(phi0) ? phi0 : 0;
  phi1 = Number.isFinite(phi1) ? phi1 : 0;

  const re = data.re;
  const im = data.im;
  const length = data.re.length;

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

  const newRe = new Float64Array(length);
  const newIm = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    newRe[i] = re[i] * cosTheta - im[i] * sinTheta;
    newIm[i] = im[i] * cosTheta + re[i] * sinTheta;
    // calculate angles i+1 from i
    const newCosTheta = cosTheta - (alpha * cosTheta + beta * sinTheta);
    const newSinTheta = sinTheta - (alpha * sinTheta - beta * cosTheta);
    cosTheta = newCosTheta;
    sinTheta = newSinTheta;
  }

  return { re: newRe, im: newIm };
}
