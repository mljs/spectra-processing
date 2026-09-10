import { expect, test } from 'vitest';

import { xyArrayAlign } from '../xyArrayAlign.ts';
import { xyArrayAlignByIntensity } from '../xyArrayAlignByIntensity.ts';

test('the most intense peak takes the peaks of the other spectra', () => {
  const data = [
    { x: [10, 10.4, 10.8], y: [1, 10, 1] },
    { x: [10.2, 10.6], y: [2, 2] },
  ];
  const result = xyArrayAlignByIntensity(data, { delta: 0.25 });

  expect(Array.from(result.x)).toBeDeepCloseTo([10, 10.4, 10.8]);
  expect(result.ys.map((y) => Array.from(y))).toStrictEqual([
    [1, 10, 1],
    [0, 4, 0],
  ]);
});

test('same length spectra, simple integers', () => {
  const data = [
    { x: [1, 2, 3], y: [1, 1, 1] },
    { x: [0.1, 1.1, 2.1, 3.1, 4.1], y: [1, 1, 1, 1, 1] },
    { x: [2.9, 3.1, 3.9, 4.9], y: [1, 1, 1, 1] },
  ];
  const result = xyArrayAlignByIntensity(data, { delta: 0.15 });

  expect(Array.from(result.x)).toBeDeepCloseTo([
    0.1, 1.05, 2.05, 2.95, 3.1, 3.9, 4.1, 4.9,
  ]);
  expect(result.ys.map((y) => Array.from(y))).toStrictEqual([
    [0, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 1, 1, 0, 1],
  ]);
});

test('a slot never grows wider than 2 * delta', () => {
  // Each x is within delta of the previous one, so a chain of close neighbours
  // ends up in a single slot spanning the whole range.
  const x = Array.from({ length: 21 }, (_, index) => 100 + index * 0.004);
  const y = x.map(() => 1);
  const chained = xyArrayAlign([{ x, y }], { delta: 0.005 });

  expect(chained.x).toHaveLength(1);
  expect(chained.x[0]).toBeCloseTo(100.04, 10);

  const result = xyArrayAlignByIntensity([{ x, y }], { delta: 0.005 });

  // Each slot holds the peak that opened it and the one 0.004 further, never more.
  expect(Array.from(result.x)).toBeDeepCloseTo([
    100.002, 100.01, 100.018, 100.026, 100.034, 100.042, 100.05, 100.058,
    100.066, 100.074, 100.08,
  ]);
  expect(Array.from(result.ys[0])).toStrictEqual([
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  ]);
});

test('delta may be a function of x', () => {
  const data = [
    { x: [100, 100.5, 1000], y: [1, 1, 1] },
    { x: [100.6, 1005], y: [1, 1] },
  ];
  const result = xyArrayAlignByIntensity(data, { delta: (x) => x * 0.006 });

  expect(Array.from(result.x)).toBeDeepCloseTo([100.36666666666666, 1002.5]);
  expect(result.ys.map((y) => Array.from(y))).toStrictEqual([
    [2, 1],
    [1, 1],
  ]);
});

test('no data', () => {
  expect(xyArrayAlignByIntensity([])).toStrictEqual({
    x: new Float64Array(0),
    ys: [],
  });
  expect(xyArrayAlignByIntensity([{ x: [], y: [] }])).toStrictEqual({
    x: new Float64Array(0),
    ys: [new Float64Array(0)],
  });
});

test('x values must be ascending', () => {
  expect(() =>
    xyArrayAlignByIntensity([
      { x: [1, 2], y: [1, 1] },
      { x: [3, 2], y: [1, 1] },
    ]),
  ).toThrow('x values of the spectrum 1 must be ascending');
});

// The four spectra share the same x, but the big peak sits at 1 for the first two
// and at 1.5 for the last two.
const twoCompetingPeaks = [
  { x: [1, 1.5, 10], y: [100, 1, 1] },
  { x: [1, 1.5, 10], y: [10, 1, 1] },
  { x: [1, 1.5, 10], y: [1, 10, 1] },
  { x: [1, 1.5, 10], y: [1, 100, 1] },
];

test('competing peaks closer than delta end up in one slot', () => {
  // The 100 at x = 1 opens the first slot, and delta = 1 reaches 1.5, so every
  // point of both peaks joins it: 224 of intensity at (112 * 1 + 112 * 1.5) / 224.
  const result = xyArrayAlignByIntensity(twoCompetingPeaks);

  expect(Array.from(result.x)).toBeDeepCloseTo([1.25, 10]);
  expect(result.ys.map((y) => Array.from(y))).toStrictEqual([
    [101, 1],
    [11, 1],
    [11, 1],
    [101, 1],
  ]);
});

test('competing peaks further apart than delta keep their own slot', () => {
  // 1.5 is now out of reach of the slot opened at 1, so each peak keeps its own
  // and the spectra come back exactly as they went in.
  const result = xyArrayAlignByIntensity(twoCompetingPeaks, { delta: 0.3 });

  expect(Array.from(result.x)).toBeDeepCloseTo([1, 1.5, 10]);
  expect(result.ys.map((y) => Array.from(y))).toStrictEqual([
    [100, 1, 1],
    [10, 1, 1],
    [1, 10, 1],
    [1, 100, 1],
  ]);
});

test('the weighted centre is pulled towards the more intense spectrum', () => {
  // Every peak of the second spectrum sits 0.5 above its counterpart in the first and
  // within delta, so each pair shares a slot. The centre is the intensity weighted
  // average, so it lands near the strong spectrum rather than halfway: a peak of 10 at
  // 1 and one of 1 at 1.5 give (10 * 1 + 1 * 1.5) / 11. The peaks at 10 coincide.
  const result = xyArrayAlignByIntensity([
    { x: [1, 5, 10], y: [10, 10, 1] },
    { x: [1.5, 5.5, 10], y: [1, 1, 1] },
  ]);

  expect(Array.from(result.x)).toBeDeepCloseTo([11.5 / 11, 55.5 / 11, 10]);
  expect(result.ys.map((y) => Array.from(y))).toStrictEqual([
    [10, 10, 1],
    [1, 1, 1],
  ]);
});
