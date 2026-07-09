import { expect, test } from 'vitest';

import { xRobustDistributionStats } from '../xRobustDistributionStats.ts';

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

test('two close elements', () => {
  const data = [1.4029999999999998, 1.403];
  const stats = xRobustDistributionStats(data);

  expect(stats).toStrictEqual({
    min: 1.4029999999999998,
    q1: 1.403,
    median: 1.403,
    q3: 1.403,
    max: 1.403,
    lowerWhisker: 1.4029999999999998,
    upperWhisker: 1.403,
    minWhisker: 1.4029999999999998,
    maxWhisker: 1.403,
    iqr: 0,
    outliers: [],
    mean: 1.403,
    nb: 2,
    sd: 0,
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

test('more complex case with multiple outliers', () => {
  const data = [
    1050, 1052, 1052, 1052, 1053, 1055, 1055, 1055, 1055, 1056, 1056, 1056,
    1056, 1056, 1056, 1056, 1056, 1056, 1056, 1057, 1057, 1057, 1057, 1057,
    1057, 1057, 1057, 1057, 1057, 1058, 1058, 1058, 1059, 1065, 1072, 1074,
  ];

  expect(xRobustDistributionStats(data)).toStrictEqual({
    min: 1050,
    q1: 1055.75,
    median: 1056,
    q3: 1057,
    max: 1074,
    lowerWhisker: 1053.875,
    upperWhisker: 1058.875,
    minWhisker: 1055,
    maxWhisker: 1058,
    iqr: 1.25,
    outliers: [1050, 1052, 1052, 1052, 1053, 1059, 1065, 1072, 1074],
    mean: 1056.4444444444443,
    sd: 0.8915558282417289,
    nb: 27,
  });
});

test('throws on NaN', () => {
  expect(() =>
    xRobustDistributionStats([1, 2, 3, 4, 5, 10, Number.NaN]),
  ).toThrow('input must not contain NaN values');
});

test('Infinity is a genuine high outlier, not missing', () => {
  expect(xRobustDistributionStats([1, 2, 3, 4, 5, Infinity])).toStrictEqual({
    min: 1,
    q1: 2.25,
    median: 3.5,
    q3: 4.75,
    max: Infinity,
    lowerWhisker: -1.5,
    upperWhisker: 8.5,
    minWhisker: 1,
    maxWhisker: 5,
    iqr: 2.5,
    outliers: [Infinity],
    mean: 3,
    sd: 1.5811388300841898,
    nb: 5,
  });
});

test('throws when there is no finite value', () => {
  expect(() => xRobustDistributionStats([Number.NaN, Number.NaN])).toThrow(
    'input must not contain NaN values',
  );
});
