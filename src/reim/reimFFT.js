import FFT from 'fft.js';

export function reimFFT(data, inverse) {
  let { re, im } = data;
  const size = re.length;
  const csize = size << 1;
  let complexArray = new Float64Array(csize);

  for (let i = 0; i < csize; i += 2) {
    complexArray[i] = re[i >>> 1];
    complexArray[i + 1] = im[i >>> 1];
  }

  let fft = new FFT(size);
  let output = new Float64Array(csize);
  if (inverse) {
    fft.inverseTransform(output, complexArray);
  } else {
    fft.transform(output, complexArray);
  }

  let newRe = new Float64Array(size);
  let newIm = new Float64Array(size);
  for (let i = 0; i < csize; i += 2) {
    newRe[i >>> 1] = output[i];
    newIm[i >>> 1] = output[i + 1];
  }

  return { re: newRe, im: newIm };
}
