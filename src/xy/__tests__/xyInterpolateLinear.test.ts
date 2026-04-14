import { expect, test } from 'vitest';

import { xyInterpolateLinear } from '../xyInterpolateLinear.ts';

test('basic linear interpolation', () => {
  const data = {
    x: [0, 1, 2, 3, 4],
    y: [0, 10, 20, 30, 40],
  };
  const xTarget = [0.5, 1.5, 2.5, 3.5];

  const result = xyInterpolateLinear(data, xTarget);

  expect(Array.from(result)).toStrictEqual([5, 15, 25, 35]);
});

test('interpolation with exact matches', () => {
  const data = {
    x: [0, 1, 2, 3, 4],
    y: [0, 10, 20, 30, 40],
  };
  const xTarget = [1, 2, 3];

  const result = xyInterpolateLinear(data, xTarget);

  expect(Array.from(result)).toStrictEqual([10, 20, 30]);
});

test('extrapolation before first point', () => {
  const data = {
    x: [1, 2, 3],
    y: [10, 20, 30],
  };
  const xTarget = [0, 0.5];

  const result = xyInterpolateLinear(data, xTarget);

  expect(Array.from(result)).toStrictEqual([0, 5]);
});

test('extrapolation after last point', () => {
  const data = {
    x: [1, 2, 3],
    y: [10, 20, 30],
  };
  const xTarget = [4, 5];

  const result = xyInterpolateLinear(data, xTarget);

  expect(Array.from(result)).toStrictEqual([30, 30]);
});

test('single point input', () => {
  const data = {
    x: [5],
    y: [100],
  };
  const xTarget = [3, 5, 7];

  const result = xyInterpolateLinear(data, xTarget);

  expect(Array.from(result)).toStrictEqual([100, 100, 100]);
});

test('empty input', () => {
  const data = {
    x: [],
    y: [],
  };
  const xTarget = [1, 2, 3];

  const result = xyInterpolateLinear(data, xTarget);

  expect(result).toHaveLength(0);
});

test('empty target', () => {
  const data = {
    x: [1, 2, 3],
    y: [10, 20, 30],
  };
  const xTarget: number[] = [];

  const result = xyInterpolateLinear(data, xTarget);

  expect(result).toHaveLength(0);
});

test('non-uniform spacing', () => {
  const data = {
    x: [0, 1, 5, 10],
    y: [0, 10, 50, 100],
  };
  const xTarget = [0.5, 3, 7.5];

  const result = xyInterpolateLinear(data, xTarget);

  expect(Array.from(result)).toStrictEqual([5, 30, 75]);
});

test('downsampling use case', () => {
  const data = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    y: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100],
  };
  const xTarget = [0, 2.5, 5, 7.5, 10];

  const result = xyInterpolateLinear(data, xTarget);

  expect(Array.from(result)).toStrictEqual([0, 6.5, 25, 56.5, 100]);
});

test('with Float64Array input', () => {
  const data = {
    x: new Float64Array([0, 1, 2, 3, 4]),
    y: new Float64Array([0, 10, 20, 30, 40]),
  };
  const xTarget = new Float64Array([0.5, 1.5, 2.5, 3.5]);

  const result = xyInterpolateLinear(data, xTarget);

  expect(Array.from(result)).toStrictEqual([5, 15, 25, 35]);
});

test('negative values', () => {
  const data = {
    x: [-2, -1, 0, 1, 2],
    y: [-20, -10, 0, 10, 20],
  };
  const xTarget = [-1.5, -0.5, 0.5, 1.5];

  const result = xyInterpolateLinear(data, xTarget);

  expect(Array.from(result)).toStrictEqual([-15, -5, 5, 15]);
});

test('large dataset performance', () => {
  const n = 10000;
  const x = new Float64Array(n);
  const y = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    x[i] = i;
    y[i] = i * i;
  }

  const targetN = 5000;
  const xTarget = new Float64Array(targetN);
  for (let i = 0; i < targetN; i++) {
    xTarget[i] = (i * (n - 1)) / (targetN - 1);
  }

  const result = xyInterpolateLinear({ x, y }, xTarget);

  expect(result).toHaveLength(targetN);
  expect(result[0]).toBe(0);
  expect(result[targetN - 1]).toBeCloseTo(y[n - 1], 5);
});

test('duplicate x values in target', () => {
  const data = {
    x: [0, 1, 2, 3, 4],
    y: [0, 10, 20, 30, 40],
  };
  const xTarget = [1.5, 1.5, 2.5, 2.5];

  const result = xyInterpolateLinear(data, xTarget);

  expect(Array.from(result)).toStrictEqual([15, 15, 25, 25]);
});
