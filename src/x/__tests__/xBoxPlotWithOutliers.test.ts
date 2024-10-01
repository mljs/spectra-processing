import { expect, test } from 'vitest';

import { xBoxPlotWithOutliers } from '../xBoxPlotWithOutliers';

test('test xBoxPlotWithOutliers even', () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  expect(xBoxPlotWithOutliers(array)).toStrictEqual({
    q1: 2.5,
    median: 5.5,
    q3: 8.5,
    min: 0,
    max: 11,
    outliers: [],
  });
});

test('test xBoxPlotWithOutliers even small', () => {
  const array = [0, 1, 2, 3, 4, 5];
  expect(xBoxPlotWithOutliers(array)).toStrictEqual({
    q1: 1,
    median: 2.5,
    q3: 4,
    min: 0,
    max: 5,
    outliers: [],
  });
});

test('test xBoxPlotWithOutliers odd', () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  expect(xBoxPlotWithOutliers(array)).toStrictEqual({
    q1: 2,
    median: 5,
    q3: 8,
    min: 0,
    max: 10,
    outliers: [],
  });
});

test('test xBoxPlotWithOutliers odd small', () => {
  const array = [0, 1, 2, 3, 4];
  expect(xBoxPlotWithOutliers(array)).toStrictEqual({
    q1: 0.5,
    median: 2,
    q3: 3.5,
    min: 0,
    max: 4,
    outliers: [],
  });
});

test('test xBoxPlotWithOutliers too small', () => {
  const array = [0, 1, 2, 3];
  expect(() => xBoxPlotWithOutliers(array)).toThrow(
    'can not calculate info if array contains less than 5 elements',
  );
});

test('test xBoxPlotWithOutliers with one element', () => {
  const array = [42];
  expect(() => xBoxPlotWithOutliers(array)).toThrow(
    'can not calculate info if array contains less than 5 elements',
  );
});

test('test xBoxPlotWithOutliers with one element', () => {
  const array = [42];
  const result = xBoxPlotWithOutliers(array, { allowSmallArray: true });
  expect(result).toStrictEqual({
    q1: 42,
    median: 42,
    q3: 42,
    min: 42,
    max: 42,
    outliers: [],
  });
});

test('test xBoxPlotWithOutliers with 2 elements', () => {
  const array = [40, 44];
  const result = xBoxPlotWithOutliers(array, { allowSmallArray: true });
  expect(result).toStrictEqual({
    q1: 40,
    median: 42,
    q3: 44,
    min: 40,
    max: 44,
    outliers: [],
  });
});

test('test xBoxPlotWithOutliers with 3 elements', () => {
  const array = [40, 42, 44];
  const result = xBoxPlotWithOutliers(array, { allowSmallArray: true });
  expect(result).toStrictEqual({
    q1: 40,
    median: 42,
    q3: 44,
    min: 40,
    max: 44,
    outliers: [],
  });
});

test('outliers', () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100];
  expect(xBoxPlotWithOutliers(array)).toStrictEqual({
    q1: 2,
    median: 5,
    q3: 8,
    min: 0,
    max: 9,
    outliers: [100],
  });
});
