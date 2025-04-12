import { expect, test } from 'vitest';

import { xDistributionStats } from '../xDistributionStats';

test('empty array', () => {
  const data: number[] = [];
  expect(() => xDistributionStats(data)).toThrow('input must not be empty');
});

test('one element', () => {
  const data = [15];
  const stats = xDistributionStats(data);
  expect(stats).toStrictEqual({
    q1: 15,
    median: 15,
    q3: 15,
    min: 15,
    max: 15,
    mean: 15,
    sd: Number.NaN,
    nb: 1,
  });
});

test('4 elements', () => {
  const data = [15, 13, 17, 7];
  const stats = xDistributionStats(data);
  expect(stats).toBeDeepCloseTo({
    min: 7,
    q1: 11.5,
    median: 14,
    q3: 15.5,
    max: 17,
    mean: 13,
    sd: 4.320493798938574,
    nb: 4,
  });
});

test('5 elements', () => {
  const data = [1, 2, 3, 4, 5];
  const stats = xDistributionStats(data);
  expect(stats).toBeDeepCloseTo({
    min: 1,
    q1: 2,
    median: 3,
    q3: 4,
    max: 5,
    mean: 3,
    sd: 1.5811388300841898,
    nb: 5,
  });
});

test('typed array', () => {
  const data = [15, 13, 17, 7];
  const typedArray = Uint16Array.from(data);
  expect(xDistributionStats(typedArray)).toStrictEqual(
    xDistributionStats(data),
  );
});
