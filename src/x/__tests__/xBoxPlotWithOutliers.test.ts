import { expect, test } from 'vitest';

import { xBoxPlotWithOutliers } from '../xBoxPlotWithOutliers';

test('test xBoxPlotWithOutliers even', () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  expect(xBoxPlotWithOutliers(array)).toStrictEqual({
    min: 0,
    q1: 2.75,
    median: 5.5,
    q3: 8.25,
    max: 11,
    outliers: [],
  });
});

test('outliers', () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100];
  expect(xBoxPlotWithOutliers(array)).toStrictEqual({
    min: 0,
    q1: 2.5,
    median: 5,
    q3: 7.5,
    max: 9,
    outliers: [100],
  });
});
