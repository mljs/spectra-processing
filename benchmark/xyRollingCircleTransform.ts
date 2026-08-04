/* eslint-disable no-console */
import Benchmark from 'benchmark';
import type { NumberArray } from 'cheminfo-types';
import { XSadd } from 'ml-xsadd';

import { xFindClosestIndex } from '../src/x/xFindClosestIndex.ts';

const size = 100000;

// Deterministic, reproducible input: a slowly varying baseline plus noise.
const { random } = new XSadd(42);
const x = new Float64Array(size);
const y = new Float64Array(size);
for (let i = 0; i < size; i++) {
  x[i] = i;
  y[i] = Math.sin(i / 500) * 10 + random();
}

/**
 * The window bounds as they were located *before*: two binary searches per
 * center, plus a guard because the closest index may fall outside the window.
 * @param radius - radius of the circle.
 * @returns the y center of the circle for each x value.
 */
function withFindClosestIndex(radius: number): Float64Array {
  const radius2 = radius * radius;
  const yCenters = new Float64Array(size);
  for (let i = 0; i < size; i++) {
    const x0 = x[i];
    const fromX = xFindClosestIndex(x, x0 - radius);
    const toX = xFindClosestIndex(x, x0 + radius);
    let yShift = y[i] + radius;
    for (let j = fromX; j <= toX; j++) {
      const deltaX = x[j] - x0;
      if (Math.abs(deltaX) > radius) {
        continue;
      }
      const current = y[j] + Math.sqrt(radius2 - deltaX * deltaX);
      if (current > yShift) {
        yShift = current;
      }
    }
    yCenters[i] = yShift;
  }
  return yCenters;
}

/**
 * The window bounds as they are located *now*: both ends only move forward, so
 * the bounds are exact and no per-element guard is needed.
 * @param radius - radius of the circle.
 * @returns the y center of the circle for each x value.
 */
function withSlidingWindow(radius: number): Float64Array {
  const radius2 = radius * radius;
  const yCenters = new Float64Array(size);
  let fromX = 0;
  let toX = 0;
  for (let i = 0; i < size; i++) {
    const x0 = x[i];
    while (x[fromX] - x0 < -radius) {
      fromX++;
    }
    while (toX + 1 < size && x[toX + 1] - x0 <= radius) {
      toX++;
    }
    let yShift = y[i] + radius;
    for (let j = fromX; j <= toX; j++) {
      const deltaX = x[j] - x0;
      const current = y[j] + Math.sqrt(radius2 - deltaX * deltaX);
      if (current > yShift) {
        yShift = current;
      }
    }
    yCenters[i] = yShift;
  }
  return yCenters;
}

function checksum(array: NumberArray): number {
  let sum = 0;
  for (const value of array) {
    sum += value;
  }
  return sum;
}

for (const radius of [1.5, 50]) {
  const before = withFindClosestIndex(radius);
  const after = withSlidingWindow(radius);
  for (let i = 0; i < before.length; i++) {
    if (before[i] !== after[i]) {
      throw new Error(`values differ at ${i}: ${before[i]} vs ${after[i]}`);
    }
  }

  const points = 2 * Math.floor(radius) + 1;
  console.log(
    `\nradius ${radius} (~${points} points per window), n = ${size}, checksum ${checksum(after).toFixed(6)}`,
  );

  new Benchmark.Suite()
    .add('xFindClosestIndex', () => withFindClosestIndex(radius), {
      minSamples: 30,
    })
    .add('sliding window', () => withSlidingWindow(radius), { minSamples: 30 })
    .on('cycle', (event: Benchmark.Event) => {
      const { target } = event;
      const stats = target.stats;
      if (!stats) return;
      const nsPerPoint = (stats.mean * 1e9) / size;
      console.log(
        `${target.name?.padEnd(18)} ${(1 / stats.mean).toFixed(1).padStart(7)} ops/sec | ${nsPerPoint.toFixed(1)} ns/point | rme ${stats.rme.toFixed(1)}% | ${stats.sample.length} samples`,
      );
    })
    .run();
}
