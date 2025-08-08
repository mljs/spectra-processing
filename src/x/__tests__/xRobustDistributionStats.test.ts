import { expect, test } from 'vitest';

import { xRobustDistributionStats } from '../xRobustDistributionStats';

test('empty array', () => {
  const data: number[] = [];

  expect(() => xRobustDistributionStats(data)).toThrow(
    'input must not be empty',
  );
});

test('one element', () => {
  const data = [15];
  const stats = xRobustDistributionStats(data);

  expect(stats).toStrictEqual({
    min: 15,
    q1: 15,
    median: 15,
    q3: 15,
    max: 15,
    lowerWhisker: 15,
    upperWhisker: 15,
    minWhisker: 15,
    maxWhisker: 15,
    iqr: 0,
    mean: 15,
    sd: Number.NaN,
    nb: 1,
    outliers: [],
  });
});

test('4 elements', () => {
  const data = [15, 13, 17, 7];
  const stats = xRobustDistributionStats(data);

  expect(stats).toBeDeepCloseTo({
    min: 7,
    q1: 11.5,
    median: 14,
    q3: 15.5,
    max: 17,
    lowerWhisker: 5.5,
    upperWhisker: 21.5,
    minWhisker: 7,
    maxWhisker: 17,
    iqr: 4,
    outliers: [],
    mean: 13,
    sd: 4.320493798938574,
    nb: 4,
  });
});

test('5 elements', () => {
  const data = [1, 2, 3, 4, 5];
  const stats = xRobustDistributionStats(data);

  expect(stats).toBeDeepCloseTo({
    min: 1,
    q1: 2,
    median: 3,
    q3: 4,
    max: 5,
    lowerWhisker: -1,
    upperWhisker: 7,
    minWhisker: 1,
    maxWhisker: 5,
    iqr: 2,
    outliers: [],
    mean: 3,
    sd: 1.5811388300841898,
    nb: 5,
  });
});

test('6 elements with outlier', () => {
  const data = [1, 2, 3, 4, 5, 10];
  const stats = xRobustDistributionStats(data);

  expect(stats).toBeDeepCloseTo({
    min: 1,
    q1: 2.25,
    median: 3.5,
    q3: 4.75,
    max: 10,
    lowerWhisker: -1.5,
    upperWhisker: 8.5,
    minWhisker: 1,
    maxWhisker: 5,
    iqr: 2.5,
    outliers: [10],
    mean: 3,
    sd: 1.5811388300841898,
    nb: 5,
  });
});

test('typed array', () => {
  const data = [15, 13, 17, 7];
  const typedArray = Uint16Array.from(data);

  expect(xRobustDistributionStats(typedArray)).toStrictEqual(
    xRobustDistributionStats(data),
  );
});
