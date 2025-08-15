import { expect, test } from 'vitest';

import { xBoxPlotWithOutliers } from '../xBoxPlotWithOutliers.ts';

test('test xBoxPlotWithOutliers even', () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const result = xBoxPlotWithOutliers(array);

  expect(result).toStrictEqual({
    min: 0,
    minWhisker: 0,
    lowerWhisker: -5.5,
    q1: 2.75,
    median: 5.5,
    q3: 8.25,
    maxWhisker: 11,
    upperWhisker: 16.5,
    max: 11,
    iqr: 5.5,
    outliers: [],
  });
});

test('outliers', () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100];
  const result = xBoxPlotWithOutliers(array);

  expect(result).toStrictEqual({
    min: 0,
    q1: 2.5,
    median: 5,
    q3: 7.5,
    max: 100,
    lowerWhisker: -5,
    upperWhisker: 15,
    minWhisker: 0,
    maxWhisker: 9,
    iqr: 5,
    outliers: [100],
  });
});
