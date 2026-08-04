/* eslint-disable no-console */
import Benchmark from 'benchmark';
import { XSadd } from 'ml-xsadd';

import { xyRollingCircle } from '../src/xy/xyRollingCircle.ts';
import { xyRollingCircleTransform } from '../src/xy/xyRollingCircleTransform.ts';

const size = 100000;

// Deterministic, reproducible input: a slowly varying baseline plus noise.
const { random } = new XSadd(42);
const x = new Float64Array(size);
const y = new Float64Array(size);
for (let i = 0; i < size; i++) {
  x[i] = i;
  y[i] = Math.sin(i / 500) * 10 + random();
}
const data = { x, y };

// What the touched points cost: xyRollingCircle does the same scan as the
// transform, plus one extra pass over each window to mark the supporting points.
for (const radius of [1.5, 50]) {
  const { points } = xyRollingCircle(data, { radius });
  console.log(
    `\nradius ${radius}, n = ${size}, ${points.length} touched points`,
  );

  new Benchmark.Suite()
    .add('transform', () => xyRollingCircleTransform(data, { radius }), {
      minSamples: 30,
    })
    .add('with points', () => xyRollingCircle(data, { radius }), {
      minSamples: 30,
    })
    .on('cycle', (event: Benchmark.Event) => {
      const { target } = event;
      const stats = target.stats;
      if (!stats) return;
      const nsPerPoint = (stats.mean * 1e9) / size;
      console.log(
        `${target.name?.padEnd(10)} ${(1 / stats.mean).toFixed(1).padStart(7)} ops/sec | ${nsPerPoint.toFixed(1)} ns/point | rme ${stats.rme.toFixed(1)}% | ${stats.sample.length} samples`,
      );
    })
    .run();
}
