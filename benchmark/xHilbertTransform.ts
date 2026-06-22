/* eslint-disable no-console */
import FFT from 'fft.js';
import { XSadd } from 'ml-xsadd';

import { xHilbertTransform } from '../src/x/xHilbertTransform.ts';

const size = 2 ** 16; // power of two => the FFT path (hilbertTransformWithFFT)
const count = 10; // signals processed per round
const targetMs = 5000;

// Deterministic, reproducible input.
const { random } = new XSadd(42);
const signals = Array.from({ length: count }, () => {
  const array = new Float64Array(size);
  for (let i = 0; i < size; i++) array[i] = random() * 2 - 1;
  return array;
});

/**
 * Hilbert transform via FFT as it was *before* the shared cache: a fresh `FFT`
 * instance is built on every call. Mirrors `hilbertTransformWithFFT`, used as
 * the baseline to confirm the cached version is faster.
 * @param array - real input signal whose length is a power of two.
 * @returns the Hilbert transform (90° phase-shifted signal).
 */
function hilbertNoCache(array: Float64Array): Float64Array {
  const length = array.length;
  const fft = new FFT(length);

  const spectrum = new Float64Array(length * 2);
  fft.realTransform(spectrum, array);
  fft.completeSpectrum(spectrum);

  const half = length >> 1;
  const nyquist = half << 1;
  spectrum[nyquist] = 0;
  spectrum[nyquist + 1] = 0;
  for (let j = (half + 1) << 1; j < spectrum.length; j += 2) {
    spectrum[j] = -spectrum[j];
    spectrum[j + 1] = -spectrum[j + 1];
  }

  const hilbertSignal = new Float64Array(length * 2);
  fft.inverseTransform(hilbertSignal, spectrum);

  const result = new Float64Array(length);
  for (let i = 0; i < length; i++) result[i] = hilbertSignal[i * 2 + 1];
  return result;
}

/**
 * Run `task` for `targetMs` and report the time per transform. Each round
 * processes `count` signals.
 * @param label - section name.
 * @param task - one round of work (transforms all `count` signals).
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
  const total = rounds * count;
  console.log(label);
  console.log(
    `  ${(elapsed / total).toFixed(3)} ms per transform  (${total} transforms over ${rounds} rounds)`,
  );
  console.log('');
}

// Sanity check: the cached path and the baseline must compute the same thing.
const reference = hilbertNoCache(signals[0]);
const cached = xHilbertTransform(signals[0]);
let maxDiff = 0;
for (let i = 0; i < reference.length; i++) {
  const diff = Math.abs(reference[i] - cached[i]);
  if (diff > maxDiff) maxDiff = diff;
}

console.log(
  `xHilbertTransform: size ${size} (2^16), ${count} signals per round`,
);
console.log(`equivalence check: max abs diff ${maxDiff.toExponential(2)}\n`);

bench('before shared cache (new FFT per call)', () => {
  for (const signal of signals) hilbertNoCache(signal);
});

bench('after shared cache (reused FFT instance)', () => {
  for (const signal of signals) xHilbertTransform(signal);
});
