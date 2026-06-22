/* eslint-disable no-console */
import FFT from 'fft.js';
import { XSadd } from 'ml-xsadd';

import { reimFFT } from '../src/reim/reimFFT.ts';
import { reimArrayFFT } from '../src/reimArray/reimArrayFFT.ts';
import type { DataReIm } from '../src/types/index.ts';

const size = 2 ** 16; // 64k-point transform: FFT setup dominates the cost
const count = 10; // number of spectra processed per round
const targetMs = 5000;

// Deterministic, reproducible input so every section runs on identical data.
const { random } = new XSadd(42);
const spectra = Array.from({ length: count }, () => {
  const re = new Float64Array(size);
  const im = new Float64Array(size);
  for (let i = 0; i < size; i++) {
    re[i] = random();
    im[i] = random();
  }
  return { re, im };
});

/**
 * `reimFFT` as it was *before* the cache fix: a fresh `FFT` instance is built on
 * every call. Kept here as the baseline to confirm the cached version is faster.
 * @param data - complex spectrum.
 * @returns FFT of the complex spectrum.
 */
function reimFFTNoCache(data: DataReIm): DataReIm<Float64Array> {
  const { re, im } = data;
  const length = re.length;
  const csize = length << 1;

  const complexArray = new Float64Array(csize);
  for (let i = 0; i < csize; i += 2) {
    complexArray[i] = re[i >>> 1];
    complexArray[i + 1] = im[i >>> 1];
  }

  const fft = new FFT(length);
  const output = new Float64Array(csize);
  fft.transform(output, complexArray);

  const newRe = new Float64Array(length);
  const newIm = new Float64Array(length);
  for (let i = 0; i < csize; i += 2) {
    newRe[i >>> 1] = output[i];
    newIm[i >>> 1] = output[i + 1];
  }
  return { re: newRe, im: newIm };
}

/**
 * Run `task` repeatedly for `targetMs` and report the time per FFT. Each round
 * performs `count` transforms.
 * @param label - section name.
 * @param task - one round of work (transforms all `count` spectra).
 */
function bench(label: string, task: () => void): void {
  task(); // warmup
  let rounds = 0;
  const start = performance.now();
  while (performance.now() - start < targetMs) {
    task();
    rounds++;
  }
  const elapsed = performance.now() - start;
  const totalFFTs = rounds * count;
  console.log(label);
  console.log(
    `  ${(elapsed / totalFFTs).toFixed(3)} ms per FFT  (${totalFFTs} FFTs over ${rounds} rounds)`,
  );
  console.log('');
}

console.log(`FFT size: ${size} (2^16), ${count} spectra per round`);
console.log('');

// Before the fix: new FFT instance per call.
bench('reimFFT — before fix (new FFT per call)', () => {
  for (const spectrum of spectra) reimFFTNoCache(spectrum);
});

// After the fix: FFT instance cached per size and reused across calls.
bench('reimFFT — after fix (cached FFT instance)', () => {
  for (const spectrum of spectra) reimFFT(spectrum);
});

// reimArrayFFT reuses a single FFT instance (and working buffers) for the whole
// array in one call.
bench('reimArrayFFT (single shared FFT instance)', () => {
  reimArrayFFT(spectra);
});
