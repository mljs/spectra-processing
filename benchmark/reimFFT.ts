import { reimFFT } from '../src/reim/reimFFT.ts';

const size = 2 ** 16;
const re = new Float64Array(size);
const im = new Float64Array(size);
for (let i = 0; i < size; i++) {
  re[i] = Math.random();
  im[i] = Math.random();
}
// Warmup
reimFFT({ re, im });

// Benchmark: repeat until ~5s
const targetMs = 5000;
let iterations = 0;

console.time('reimFFT');
const start = performance.now();
while (performance.now() - start < targetMs) {
  reimFFT({ re, im });
  iterations++;
}
console.timeEnd('reimFFT');

console.log(`${iterations} iterations, ${size} points each`);
console.log(
  `${((performance.now() - start) / iterations).toFixed(2)} ms per iteration`,
);
