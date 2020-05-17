export function reimFFTShift(data) {
  const { re, im } = data;
  const nbPoints = re.length;
  let newRe = new Float64Array(re);
  let newIm = new Float64Array(im);
  newRe.set(re.slice(0, (nbPoints + 1) / 2), (nbPoints + 1) / 2);
  newRe.set(re.slice((nbPoints + 1) / 2));
  newIm.set(im.slice(0, (nbPoints + 1) / 2), (nbPoints + 1) / 2);
  newIm.set(im.slice((nbPoints + 1) / 2));

  return { re: newRe, im: newIm };
}
