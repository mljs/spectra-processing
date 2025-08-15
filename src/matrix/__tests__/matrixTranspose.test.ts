import { expect, test } from 'vitest';

import { matrixTranspose } from '../matrixTranspose.ts';

test('should transpose a square matrix', () => {
  const matrix = [
    [1, 2],
    [3, 4],
  ];

  expect(matrixTranspose(matrix, { ArrayConstructor: Array })).toStrictEqual([
    [1, 3],
    [2, 4],
  ]);
});

test('should transpose a rectangular matrix', () => {
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
  ];

  expect(matrixTranspose(matrix, { ArrayConstructor: Array })).toStrictEqual([
    [1, 4],
    [2, 5],
    [3, 6],
  ]);
});

test('should transpose a single row matrix', () => {
  const matrix = [[1, 2, 3]];

  expect(matrixTranspose(matrix, { ArrayConstructor: Array })).toStrictEqual([
    [1],
    [2],
    [3],
  ]);
});

test('should transpose a single column matrix', () => {
  const matrix = [[1], [2], [3]];

  expect(matrixTranspose(matrix, { ArrayConstructor: Array })).toStrictEqual([
    [1, 2, 3],
  ]);
});
