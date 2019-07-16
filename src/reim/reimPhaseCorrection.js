/**
 * Phase correction filter
 * @param {object} reim - An object of kind {re:[], im:[]}
 * @param {number} [phi0 = 0] - value
 * @param {number} [phi1 = 0] - value
 * @return {object} returns a new object {re:[], im:[]}
 */
export function reimPhaseCorrection(data, phi0, phi1) {
  phi0 = Number.isFinite(phi0) ? phi0 : 0;
  phi1 = Number.isFinite(phi1) ? phi1 : 0;

  const re = data.re.slice(0);
  const im = data.im.slice(0);
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
    cosTheta = cosTheta - (alpha * cosTheta + beta * sinTheta);
    sinTheta = sinTheta - (alpha * sinTheta - beta * cosTheta);
  }

  return { re: newRe, im: newIm };
}
