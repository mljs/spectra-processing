import { expect, test } from 'vitest';

import { matrixMinMaxAbsoluteZ } from '../matrixMinMaxAbsoluteZ';

test('basic', () => {
  const matrix = [
    [10, 3, 2, 2],
    [2, 2, 1, -3],
    [3, 1, 3, 15],
  ];
  const result = matrixMinMaxAbsoluteZ(matrix);

  expect(result).toStrictEqual({ min: 1, max: 15 });
});

test('zero', () => {
  const matrix = [[]];

  expect(() => {
    matrixMinMaxAbsoluteZ(matrix);
  }).toThrow('matrixMinMaxAbsoluteZ requires at least 1 row and 1 column');
});
