import { expect, test } from 'vitest';

import { matrixMaxAbsoluteZ } from '../matrixMaxAbsoluteZ';

test('basic', () => {
  const matrix = [
    [10, 3, 2, 2],
    [2, 2, 1, -3],
    [3, 1, 3, 15],
  ];
  const result = matrixMaxAbsoluteZ(matrix);
  expect(result).toBe(15);
});

test('large negative', () => {
  const matrix = [
    [10, 3, 2, 2],
    [2, 2, 1, -30],
    [3, 1, 3, 15],
  ];
  const result = matrixMaxAbsoluteZ(matrix);
  expect(result).toBe(30);
});

test('zero', () => {
  expect(() => {
    matrixMaxAbsoluteZ([[]]);
  }).toThrow('matrix must have at least 1 row and 1 column');
});
