import { expect, test } from 'vitest';

import { matrixBoxPlot } from '../matrixBoxPlot.ts';

test('matrixBoxPlot even', () => {
  const matrix = [
    [0, 0],
    [1, 10],
    [2, 20],
    [3, 30],
    [4, 40],
    [5, 50],
    [6, 60],
    [7, 70],
    [8, 80],
    [9, 90],
    [10, 100],
    [11, 110],
  ];

  expect(matrixBoxPlot(matrix)).toStrictEqual({
    q1: Float64Array.from([2.5, 25]),
    median: Float64Array.from([5.5, 55]),
    q3: Float64Array.from([8.5, 85]),
    min: Float64Array.from([0, 0]),
    max: Float64Array.from([11, 110]),
  });
});

test('matrixBoxPlot even small', () => {
  const matrix = [[0], [1], [2], [3], [4], [5]];

  expect(matrixBoxPlot(matrix)).toStrictEqual({
    q1: Float64Array.from([1]),
    median: Float64Array.from([2.5]),
    q3: Float64Array.from([4]),
    min: Float64Array.from([0]),
    max: Float64Array.from([5]),
  });
});

test('matrixBoxPlot odd', () => {
  const matrix = [[0], [1], [2], [3], [4], [5], [6], [7], [8], [9], [10]];

  expect(matrixBoxPlot(matrix)).toStrictEqual({
    q1: Float64Array.from([2]),
    median: Float64Array.from([5]),
    q3: Float64Array.from([8]),
    min: Float64Array.from([0]),
    max: Float64Array.from([10]),
  });
});

test('matrixBoxPlot odd small', () => {
  const matrix = [[0], [1], [2], [3], [4]];

  expect(matrixBoxPlot(matrix)).toStrictEqual({
    q1: Float64Array.from([0.5]),
    median: Float64Array.from([2]),
    q3: Float64Array.from([3.5]),
    min: Float64Array.from([0]),
    max: Float64Array.from([4]),
  });
});

test('matrixBoxPlot too small', () => {
  const matrix = [[0], [1], [2], [4]];

  expect(() => matrixBoxPlot(matrix)).toThrowError(
    'can not calculate info if matrix contains less than 5 rows',
  );
});
