import { expect, test } from 'vitest';

import { matrixZPivotRescale } from '../matrixZPivotRescale';

test('only positive number', () => {
  const data = [
    [1, 3, 2, 2],
    [2, 2, 1, 3],
    [3, 1, 3, 1],
  ];
  let result = matrixZPivotRescale(data, { max: 30 });

  result = result.map((row) => Array.from(row));

  expect(result).toStrictEqual([
    [10, 30, 20, 20],
    [20, 20, 10, 30],
    [30, 10, 30, 10],
  ]);
});

test('with negative larger number', () => {
  const data = [
    [-1, -3, 2, 2],
    [2, 2, 1, -3],
    [-3, 1, -3, 1],
  ];
  let result = matrixZPivotRescale(data, { max: 30 });

  result = result.map((row) => Array.from(row));

  expect(result).toStrictEqual([
    [-10, -30, 20, 20],
    [20, 20, 10, -30],
    [-30, 10, -30, 10],
  ]);
});

test('only positive number in Int16 output', () => {
  const data = [
    [1, 3, 2, 2],
    [2, 2, 1, 3],
    [3, 1, 3, 1],
  ];
  const result = matrixZPivotRescale(data, {
    max: 30,
    ArrayConstructor: Int16Array,
  });

  expect(result).toStrictEqual([
    Int16Array.from([10, 30, 20, 20]),
    Int16Array.from([20, 20, 10, 30]),
    Int16Array.from([30, 10, 30, 10]),
  ]);
});
