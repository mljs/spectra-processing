/* eslint-disable no-console */
/*
 * Marking the touched points needs `y[j] + yScale * sqrt(radius2 - deltaX²) >= limit`.
 * That comparison can be squared into `radius2 - deltaX² >= needed²` to get rid
 * of the square root, which looks like an obvious win. It is not:
 *
 *              node 24              bun 1.3
 * radius  1.5  15.5 -> 16.7 ns/pt   11.0 -> 11.3 ns/pt
 * radius 50   247.6 -> 256.8 ns/pt  177.2 -> 158.2 ns/pt
 *
 * so it is a wash: slower on V8 in both cases, slower on JSC for a narrow window
 * and faster only for a wide one. The square root stays, it is simpler.
 *
 * Measure it here and not through `xyRollingCircle`: that one allocates one
 * object per touched point (~70000 of them at radius 1.5), and the resulting GC
 * pressure makes its timings bimodal, 26 or 37 ns/point for the very same code.
 */
import Benchmark from 'benchmark';
import { XSadd } from 'ml-xsadd';

const size = 100000;
const RELATIVE_TOLERANCE = 1e-10;

// Deterministic, reproducible input: a slowly varying baseline plus noise.
const { random } = new XSadd(42);
const x = new Float64Array(size);
const y = new Float64Array(size);
for (let i = 0; i < size; i++) {
  x[i] = i;
  y[i] = Math.sin(i / 500) * 10 + random();
}

/**
 * Marks the touched points with one square root per point.
 * @param radius - radius of the circle.
 * @returns the mask of the touched points.
 */
function markWithSqrt(radius: number): Uint8Array {
  const radius2 = radius * radius;
  const touching = new Uint8Array(size);
  let fromX = 0;
  let toX = 0;
  for (let i = 0; i < size; i++) {
    const x0 = x[i];
    while (x[fromX] - x0 < -radius) fromX++;
    while (toX + 1 < size && x[toX + 1] - x0 <= radius) toX++;
    let yShift = y[i] + radius;
    for (let j = fromX; j <= toX; j++) {
      const deltaX = x[j] - x0;
      const current = y[j] + Math.sqrt(radius2 - deltaX * deltaX);
      if (current > yShift) yShift = current;
    }
    const limit = yShift - RELATIVE_TOLERANCE * (Math.abs(yShift) + radius);
    for (let j = fromX; j <= toX; j++) {
      const deltaX = x[j] - x0;
      if (y[j] + Math.sqrt(radius2 - deltaX * deltaX) >= limit) {
        touching[j] = 1;
      }
    }
  }
  return touching;
}

/**
 * Marks the touched points with the squared comparison, no square root.
 * @param radius - radius of the circle.
 * @returns the mask of the touched points.
 */
function markWithSquare(radius: number): Uint8Array {
  const radius2 = radius * radius;
  const touching = new Uint8Array(size);
  let fromX = 0;
  let toX = 0;
  for (let i = 0; i < size; i++) {
    const x0 = x[i];
    while (x[fromX] - x0 < -radius) fromX++;
    while (toX + 1 < size && x[toX + 1] - x0 <= radius) toX++;
    let yShift = y[i] + radius;
    for (let j = fromX; j <= toX; j++) {
      const deltaX = x[j] - x0;
      const current = y[j] + Math.sqrt(radius2 - deltaX * deltaX);
      if (current > yShift) yShift = current;
    }
    const limit = yShift - RELATIVE_TOLERANCE * (Math.abs(yShift) + radius);
    for (let j = fromX; j <= toX; j++) {
      const needed = limit - y[j];
      if (needed <= 0) {
        touching[j] = 1;
        continue;
      }
      const deltaX = x[j] - x0;
      if (radius2 - deltaX * deltaX >= needed * needed) {
        touching[j] = 1;
      }
    }
  }
  return touching;
}

for (const radius of [1.5, 50]) {
  const withSqrt = markWithSqrt(radius);
  const withSquare = markWithSquare(radius);
  let touched = 0;
  for (let i = 0; i < size; i++) {
    if (withSqrt[i] !== withSquare[i]) {
      throw new Error(`masks differ at ${i}`);
    }
    touched += withSqrt[i];
  }
  console.log(`\nradius ${radius}, n = ${size}, ${touched} touched points`);

  new Benchmark.Suite()
    .add('sqrt', () => markWithSqrt(radius), { minSamples: 30 })
    .add('squared', () => markWithSquare(radius), { minSamples: 30 })
    .on('cycle', (event: Benchmark.Event) => {
      const { target } = event;
      const stats = target.stats;
      if (!stats) return;
      console.log(
        `${target.name?.padEnd(8)} ${(1 / stats.mean).toFixed(1).padStart(7)} ops/sec | ${((stats.mean * 1e9) / size).toFixed(1)} ns/point | rme ${stats.rme.toFixed(1)}% | ${stats.sample.length} samples`,
      );
    })
    .run();
}
