import { expect, test } from 'vitest';

import { xyMedianY } from '../xyMedianY.ts';

test('default window size of 5', () => {
  const data = {
    x: [1, 2, 3, 4, 5, 6, 7],
    y: [1, 3, 2, 100, 4, 5, 6],
  };

  const result = xyMedianY(data);

  expect(result.x).toBe(data.x);
  expect(result.y).toStrictEqual(new Float64Array([2, 2, 3, 4, 5, 5, 5]));
});

test('window size of 3', () => {
  const data = {
    x: [1, 2, 3, 4, 5],
    y: [10, 1, 5, 3, 8],
  };

  const result = xyMedianY(data, { windowSize: 3 });

  expect(result.y).toStrictEqual(new Float64Array([1, 5, 3, 5, 3]));
});

test('window size of 1 returns original values', () => {
  const data = {
    x: [1, 2, 3],
    y: [10, 20, 30],
  };

  const result = xyMedianY(data, { windowSize: 1 });

  expect(result.y).toStrictEqual(new Float64Array([10, 20, 30]));
});

test('single point', () => {
  const data = {
    x: [5],
    y: [42],
  };

  const result = xyMedianY(data);

  expect(result.y).toStrictEqual(new Float64Array([42]));
});

test('even number of elements in window returns average of middle two', () => {
  const data = {
    x: [1, 2, 3, 4],
    y: [1, 4, 2, 3],
  };

  // window size 3, at edges the window has 2 elements (even)
  const result = xyMedianY(data, { windowSize: 3 });

  // i=0: [1,4] -> median 1 (lower middle, exact: false)
  // i=1: [1,4,2] -> median 2
  // i=2: [4,2,3] -> median 3
  // i=3: [2,3] -> median 2 (lower middle, exact: false)
  expect(result.y).toStrictEqual(new Float64Array([1, 2, 3, 2]));
});

test('empty data', () => {
  const data = {
    x: [],
    y: [],
  };

  const result = xyMedianY(data);

  expect(result.y).toStrictEqual(new Float64Array([]));
});

test('does not mutate original Float64Array y data', () => {
  const y = new Float64Array([10, 1, 5, 3, 8]);
  const yOriginal = new Float64Array(y);
  const data = { x: [1, 2, 3, 4, 5], y };

  xyMedianY(data, { windowSize: 3 });

  expect(y).toStrictEqual(yOriginal);
});

test('does not mutate original plain array y data', () => {
  const y = [10, 1, 5, 3, 8];
  const yOriginal = [...y];
  const data = { x: [1, 2, 3, 4, 5], y };

  xyMedianY(data, { windowSize: 3 });

  expect(y).toStrictEqual(yOriginal);
});
