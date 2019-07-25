/**
 * This function make a zero filling to re and im part.
 * @param {object} data Object of kind {x:[], re:[], im:[]}.
 * @param {number} zeroFilling - final number of points
 * @return {SD}
 */
export function zeroFilling(data, zeroFilling) {
  let length = data.x.length;
  if (zeroFilling === 0 || length === zeroFilling) return data;

  if (length > zeroFilling) {
    return {
      x: data.x.slice(0, zeroFilling),
      re: data.re.slice(0, zeroFilling),
      im: data.im.slice(0, zeroFilling)
    };
  }

  const x = data.x;
  const re = data.re;
  const im = data.im;

  const newX = new Float64Array(zeroFilling);
  const newRE = new Float64Array(zeroFilling);
  const newIM = new Float64Array(zeroFilling);

  for (let i = 0; i < length; i++) {
    newX[i] = x[i];
    newRE[i] = re[i];
    newIM[i] = im[i];
  }
  const deltaX = (x[x.length - 1] - x[0]) / (length - 1);
  for (let i = length; i < zeroFilling; i++) {
    newX[i] = newX[i - 1] + deltaX;
  }

  return {
    x: newX,
    re: newRE,
    im: newIM
  };
}

