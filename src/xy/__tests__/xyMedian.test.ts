import { expect, test } from 'vitest';

import { xyMedian } from '../xyMedian';

test('check the median of four consecutive integers, should return 2.5', () => {
  const data = {
    x: [1, 2, 3, 4],
    y: [1, 1, 1, 1],
  };
  expect(xyMedian(data)).toBe(2.5);
});

test('check three points with occurrence 1:2:1, should return 2', () => {
  const data = {
    x: [1, 2, 3],
    y: [1, 2, 1],
  };
  expect(xyMedian(data)).toBe(2);
});

test('check two points with occurrence 3:1, should return 1', () => {
  const data = {
    x: [1, 2],
    y: [3, 1],
  };
  expect(xyMedian(data)).toBe(1);
});

test('median of four consecutive number with occurrence 1:2:1:2, should return 2.5', () => {
  const data = {
    x: [1, 2, 3, 4],
    y: [1, 2, 1, 2],
  };
  expect(xyMedian(data)).toBe(2.5);
});

test('check three consecutive numbers with occurrence 2:1:1, should return 1.5', () => {
  const data = {
    x: [1, 2, 3],
    y: [2, 1, 1],
  };
  expect(xyMedian(data)).toBe(1.5);
});

test('check one point, should return 1', () => {
  const data = {
    x: [1],
    y: [3],
  };
  expect(xyMedian(data)).toBe(1);
});

test('empty property x, should return NaN', () => {
  const data = {
    x: [],
    y: [],
  };
  expect(xyMedian(data)).toBe(NaN);
});
