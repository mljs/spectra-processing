/**
 * Manual phase correction
 * @param {Object} data - Object of kind {x:[], re:[], im:[]}.
 * @param {Number} phi0 - Angle in radians for zero order phase correction
 * @param {Number} phi1 - Angle in radians for first order phase correction
 */

export function phaseCorrection(data, phi0, phi1) {
  var length = data.x.length;

  phi0 = Number.isFinite(phi0) ? phi0 : 0;
  phi1 = Number.isFinite(phi1) ? phi1 : 0;

  const re = data.re;
  const im = data.im;

  const newRE = new Float64Array(length);
  const newIM = new Float64Array(length);

  let delta = phi1 / length;
  let alpha = 2 * Math.pow(Math.sin(delta / 2), 2);
  let beta = Math.sin(delta);
  let cosTheta = Math.cos(phi0);
  let sinTheta = Math.sin(phi0);
  let cosThetaNew, sinThetaNew;

  let reTmp, imTmp;
  for (let index = 0; index < length; index++) {
    reTmp = re[index] * cosTheta - im[index] * sinTheta;
    imTmp = re[index] * sinTheta + im[index] * cosTheta;
    newRE[index] = reTmp;
    newIM[index] = imTmp;
    cosThetaNew = cosTheta - (alpha * cosTheta + beta * sinTheta);
    sinThetaNew = sinTheta - (alpha * sinTheta - beta * cosTheta);
    cosTheta = cosThetaNew;
    sinTheta = sinThetaNew;
  }

  return {
    x: data.x,
    re: newRE,
    im: newIM,
  };
}
