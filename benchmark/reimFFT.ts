/* eslint-disable no-console */
import { reimFFT } from '../src/reim/reimFFT.ts';
import { reimArrayFFT } from '../src/reimArray/reimArrayFFT.ts';

const size = 2 ** 16;
const count = 10; // number of spectra in the array benchmark

// Build input data
const spectra = Array.from({ length: count }, () => {
  const re = new Float64Array(size);
  const im = new Float64Array(size);
  for (let i = 0; i < size; i++) {
    re[i] = Math.random();
    im[i] = Math.random();
  }
  return { re, im };
});

// Warmup
for (const s of spectra) reimFFT(s);
for (const s of spectra) reimFFT(s, { inPlace: true });
reimArrayFFT(spectra);
reimArrayFFT(spectra, { inPlace: true });

const targetMs = 5000;

// --- reimFFT (loop over each spectrum individually) ---
{
  let iterations = 0;
  const start = performance.now();
  console.time('reimFFT (loop)');
  while (performance.now() - start < targetMs) {
    for (const s of spectra) reimFFT(s);
    iterations++;
  }
  const elapsed = performance.now() - start;
  console.timeEnd('reimFFT (loop)');
  console.log(
    `  ${iterations * count} total FFTs, ${count} spectra × ${iterations} rounds`,
  );
  console.log(`  ${(elapsed / (iterations * count)).toFixed(3)} ms per FFT`);
}

console.log('');

// --- reimFFT inPlace (loop over each spectrum individually) ---
{
  let iterations = 0;
  const start = performance.now();
  console.time('reimFFT inPlace (loop)');
  while (performance.now() - start < targetMs) {
    for (const s of spectra) reimFFT(s, { inPlace: true });
    iterations++;
  }
  const elapsed = performance.now() - start;
  console.timeEnd('reimFFT inPlace (loop)');
  console.log(
    `  ${iterations * count} total FFTs, ${count} spectra × ${iterations} rounds`,
  );
  console.log(`  ${(elapsed / (iterations * count)).toFixed(3)} ms per FFT`);
}

console.log('');

// --- reimArrayFFT (single call for the whole array) ---
{
  let iterations = 0;
  const start = performance.now();
  console.time('reimArrayFFT');
  while (performance.now() - start < targetMs) {
    reimArrayFFT(spectra);
    iterations++;
  }
  const elapsed = performance.now() - start;
  console.timeEnd('reimArrayFFT');
  console.log(
    `  ${iterations * count} total FFTs, ${count} spectra × ${iterations} rounds`,
  );
  console.log(`  ${(elapsed / (iterations * count)).toFixed(3)} ms per FFT`);
}

console.log('');

// --- reimArrayFFT inPlace (single call for the whole array) ---
{
  let iterations = 0;
  const start = performance.now();
  console.time('reimArrayFFT inPlace');
  while (performance.now() - start < targetMs) {
    reimArrayFFT(spectra, { inPlace: true });
    iterations++;
  }
  const elapsed = performance.now() - start;
  console.timeEnd('reimArrayFFT inPlace');
  console.log(
    `  ${iterations * count} total FFTs, ${count} spectra × ${iterations} rounds`,
  );
  console.log(`  ${(elapsed / (iterations * count)).toFixed(3)} ms per FFT`);
}
