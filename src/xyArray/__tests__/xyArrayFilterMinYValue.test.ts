import { expect, test } from 'vitest';

import { xyArrayFilterMinYValue } from '../xyArrayFilterMinYValue.ts';

const data = [
  { x: [1, 2, 3], y: [100, 5, 1] },
  { x: [4, 5], y: [50, 2] },
];

test('the threshold comes from the largest y of all the spectra', () => {
  // 5% of 100, so the 2 of the second spectrum goes even though it is 4% of its own max
  const result = xyArrayFilterMinYValue(data, 0.05);

  expect(result.map((spectrum) => Array.from(spectrum.x))).toStrictEqual([
    [1, 2],
    [4],
  ]);
  expect(result.map((spectrum) => Array.from(spectrum.y))).toStrictEqual([
    [100, 5],
    [50],
  ]);
});

test('a spectrum may lose all of its points', () => {
  const result = xyArrayFilterMinYValue(data, 0.6);

  expect(result.map((spectrum) => Array.from(spectrum.x))).toStrictEqual([
    [1],
    [],
  ]);
});

test('a spectrum may keep all of its points', () => {
  const spectra = [
    { x: [1, 2], y: [100, 90] },
    { x: [3, 4], y: [50, 1] },
  ];
  const result = xyArrayFilterMinYValue(spectra, 0.05);

  expect(result[0].x).toStrictEqual([1, 2]);
  expect(result[1].x).toStrictEqual([3]);
});

test('without a value nothing is filtered', () => {
  expect(xyArrayFilterMinYValue(data)).toBe(data);
});

test('no data', () => {
  expect(xyArrayFilterMinYValue([], 0.5)).toStrictEqual([]);
  expect(xyArrayFilterMinYValue([{ x: [], y: [] }], 0.5)).toStrictEqual([
    { x: [], y: [] },
  ]);
});

test('the filtered spectra are plain arrays', () => {
  const filtered = xyArrayFilterMinYValue(
    [{ x: Float64Array.from([1, 2]), y: Float64Array.from([100, 1]) }],
    0.5,
  );

  // The overload gives number[], so the arrays can be pushed to.
  filtered[0].x.push(3);

  expect(filtered[0].x).toStrictEqual([1, 3]);
  expect(filtered[0].y).toStrictEqual([100]);
});
