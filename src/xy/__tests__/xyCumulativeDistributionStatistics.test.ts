import { expect, test } from 'vitest';

import { xyCumulativeDistributionStatistics } from '../xyCumulativeDistributionStatistics.ts';

test('simple case', () => {
  const data = {
    x: [0, 1, 2, 3, 4],
    y: [0, 1, 1, 1, 1],
  };

  const result = xyCumulativeDistributionStatistics(data);

  expect(result).toStrictEqual({
    x0: 0,
    x25: 1,
    x50: 2,
    x75: 3,
    x100: 4,
    xMode: 1,
    xMean: 2.5,
  });
});

test('less simple case', () => {
  const data = {
    x: [0, 1, 2, 3, 4, 5],
    y: [1, 2, 3, 3, 2, 1],
  };

  const result = xyCumulativeDistributionStatistics(data);

  expect(result).toStrictEqual({
    x0: 0,
    x25: 1,
    x50: 2,
    x75: 3,
    x100: 5,
    xMode: 2,
    xMean: 2.5,
  });
});

test('case with interpolate x', () => {
  const data = {
    x: [0, 1, 2, 3, 4, 5, 6],
    y: [1, 2, 2, 2, 2, 2, 1],
  };

  const result = xyCumulativeDistributionStatistics(data);

  expect(result).toStrictEqual({
    x0: 0,
    x25: 1,
    x50: 2.5,
    x75: 4,
    x100: 6,
    xMode: 1,
    xMean: 3,
  });
});

test('case with interpolate x giving non half integer number', () => {
  const data = {
    x: [0, 1, 2, 3, 4, 5, 6],
    y: [1, 2, 2.5, 2, 1.5, 2, 1],
  };

  const result = xyCumulativeDistributionStatistics(data);

  expect(result).toMatchCloseTo({
    x0: 0,
    x25: 1,
    x50: 2.25,
    x75: 4,
    x100: 6,
    xMode: 2,
    xMean: 2.9166666666666665,
  });
});
