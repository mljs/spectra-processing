import type { DataXY } from 'cheminfo-types';
import { XSadd } from 'ml-xsadd';
import { expect, test } from 'vitest';

import { xyArrayMergeByIntensity } from '../xyArrayMergeByIntensity.ts';

test('the x of a slot is the intensity weighted average of its peaks', () => {
  const data = [
    { x: [100.002, 200.01], y: [10, 20] },
    { x: [100.001, 200.02], y: [11, 21] },
  ];
  const result = xyArrayMergeByIntensity(data, { delta: 0.02 });

  expect(Array.from(result.x)).toBeDeepCloseTo([
    (100.002 * 10 + 100.001 * 11) / 21,
    (200.01 * 20 + 200.02 * 21) / 41,
  ]);
  expect(Array.from(result.y)).toStrictEqual([21, 41]);
  expect(Array.from(result.number)).toStrictEqual([2, 2]);
  expect(Array.from(result.from)).toStrictEqual([100.001, 200.01]);
  expect(Array.from(result.to)).toStrictEqual([100.002, 200.02]);
});

test('the strongest peak takes its neighbours before the weaker ones do', () => {
  // 5 is closer to 4 than to 10, but 10 is the most intense peak of the set and
  // takes it first, which leaves 4 alone.
  const data = [{ x: [4, 5, 10], y: [3, 1, 100] }];
  const result = xyArrayMergeByIntensity(data, { delta: 5.5 });

  expect(Array.from(result.x)).toBeDeepCloseTo([4, (5 * 1 + 10 * 100) / 101]);
  expect(Array.from(result.y)).toStrictEqual([3, 101]);
  expect(Array.from(result.number)).toStrictEqual([1, 2]);
});

test('a slot may hold several peaks of the same spectrum', () => {
  const data = [{ x: [1, 1.1, 1.2], y: [1, 5, 1] }];
  const result = xyArrayMergeByIntensity(data, { delta: 0.2 });

  expect(Array.from(result.x)).toBeDeepCloseTo([1.1]);
  expect(Array.from(result.y)).toStrictEqual([7]);
  expect(Array.from(result.number)).toStrictEqual([3]);
});

test('no data', () => {
  const result = xyArrayMergeByIntensity([]);

  expect(Array.from(result.x)).toStrictEqual([]);
  expect(Array.from(result.y)).toStrictEqual([]);
});

test('many drifting spectra keep the total intensity and stay within delta', () => {
  const delta = 0.005;
  const random = new XSadd(42);
  const trueMasses = Array.from(
    { length: 200 },
    (_, index) => 100 + index * 0.5,
  );
  const data: DataXY[] = [];
  let totalIntensity = 0;
  for (let spectrum = 0; spectrum < 500; spectrum++) {
    const x: number[] = [];
    const y: number[] = [];
    for (const mass of trueMasses) {
      if (random.random() < 0.3) continue;
      x.push(mass + (random.random() - 0.5) * 0.004);
      const intensity = 1 + random.random() * 1000;
      y.push(intensity);
      totalIntensity += intensity;
    }
    data.push({ x, y });
  }

  const result = xyArrayMergeByIntensity(data, { delta });

  expect(result.x).toHaveLength(200);

  let sum = 0;
  let numberOfPeaks = 0;
  for (let i = 0; i < result.x.length; i++) {
    sum += result.y[i];
    numberOfPeaks += result.number[i];

    expect(result.to[i] - result.from[i]).toBeLessThanOrEqual(2 * delta);
    expect(result.x[i]).toBeCloseTo(trueMasses[i], 2);
  }

  for (let i = 1; i < result.x.length; i++) {
    expect(result.x[i]).toBeGreaterThan(result.x[i - 1]);
  }

  expect(sum).toBeCloseTo(totalIntensity, 6);
  expect(numberOfPeaks).toBe(data.reduce((total, s) => total + s.x.length, 0));
});

test('slots with no intensity keep the x of the peak that opened them', () => {
  const result = xyArrayMergeByIntensity([{ x: [1, 1.05, 5], y: [0, 0, 0] }], {
    delta: 0.1,
  });

  expect(Array.from(result.x)).toStrictEqual([1, 5]);
  expect(Array.from(result.y)).toStrictEqual([0, 0]);
  expect(Array.from(result.number)).toStrictEqual([2, 1]);
});

test('more slots than the initially allocated ones', () => {
  const length = 5000;
  const x = Array.from({ length }, (_, index) => index * 10);
  const y = Array.from({ length }, (_, index) => (index % 7) + 1);

  const result = xyArrayMergeByIntensity([{ x, y }], { delta: 1 });

  expect(result.x).toHaveLength(length);
  expect(Array.from(result.x)).toStrictEqual(x);
  expect(Array.from(result.y)).toStrictEqual(y);
  expect(Array.from(result.number)).toStrictEqual(x.map(() => 1));
});
