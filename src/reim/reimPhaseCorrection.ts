import { DataReIm } from '..';

/**
 * Phase correction filter
 *
 * @param data - complex spectrum
 * @param phi0 - Angle in radians for zero order phase correction
 * @param phi1 - Angle in radians for first order phase correction
 * @returns - returns a new object {re:[], im:[]}
 */
export function reimPhaseCorrection(
  data: DataReIm,
  phi0 = 0,
  phi1 = 0,
): DataReIm {
  phi0 = Number.isFinite(phi0) ? phi0 : 0;
  phi1 = Number.isFinite(phi1) ? phi1 : 0;

  const re = data.re;
  const im = data.im;
  const length = data.re.length;

  const delta = phi1 / length;
  const alpha = 2 * Math.pow(Math.sin(delta / 2), 2);
  const beta = Math.sin(delta);
  let cosTheta = Math.cos(phi0);
  let sinTheta = Math.sin(phi0);

  const newRe = new Float64Array(length);
  const newIm = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    newRe[i] = re[i] * cosTheta - im[i] * sinTheta;
    newIm[i] = re[i] * sinTheta + im[i] * cosTheta;
    // calculate angles i+1 from i
    let newCosTheta = cosTheta - (alpha * cosTheta + beta * sinTheta);
    let newSinTheta = sinTheta - (alpha * sinTheta - beta * cosTheta);
    cosTheta = newCosTheta;
    sinTheta = newSinTheta;
  }

  return { re: newRe, im: newIm };
}
