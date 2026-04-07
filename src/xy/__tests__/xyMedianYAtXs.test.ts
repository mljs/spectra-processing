import { expect, test } from 'vitest';

import { xyMedianYAtXs } from '../xyMedianYAtXs.ts';

test('median at specific x values with window size 5', () => {
  const data = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    y: [2, 8, 3, 100, 5, 6, 1, 9, 4, 7],
  };

  const result = xyMedianYAtXs(data, [3, 7]);

  expect(result.x).toStrictEqual([3, 7]);
  expect(result.y).toStrictEqual(new Float64Array([5, 5]));
});

test('median at x values not exactly in data uses closest index', () => {
  const data = {
    x: [1, 2, 3, 4, 5],
    y: [10, 1, 5, 3, 8],
  };

  // 2.8 is closest to x=3 (index 2)
  const result = xyMedianYAtXs(data, [2.8], { windowSize: 3 });

  expect(result.y).toStrictEqual(new Float64Array([3]));
});

test('window size of 1 returns the y value at the closest x', () => {
  const data = {
    x: [1, 2, 3, 4, 5],
    y: [10, 20, 30, 40, 50],
  };

  const result = xyMedianYAtXs(data, [2, 4], { windowSize: 1 });

  expect(result.y).toStrictEqual(new Float64Array([20, 40]));
});

test('window at edges is truncated', () => {
  const data = {
    x: [1, 2, 3, 4, 5],
    y: [10, 1, 5, 3, 8],
  };

  const result = xyMedianYAtXs(data, [1, 5], { windowSize: 5 });

  // index 0: window [10,1,5] -> median 5
  // index 4: window [5,3,8] -> median 5
  expect(result.y).toStrictEqual(new Float64Array([5, 5]));
});

test('does not mutate original Float64Array y data', () => {
  const y = new Float64Array([10, 1, 5, 3, 8]);
  const yOriginal = new Float64Array(y);
  const data = { x: [1, 2, 3, 4, 5], y };

  xyMedianYAtXs(data, [2, 4], { windowSize: 3 });

  expect(y).toStrictEqual(yOriginal);
});

test('empty xValues returns empty result', () => {
  const data = {
    x: [1, 2, 3],
    y: [10, 20, 30],
  };

  const result = xyMedianYAtXs(data, []);

  expect(result.y).toStrictEqual(new Float64Array([]));
});
