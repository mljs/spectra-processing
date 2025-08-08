import { expect, test } from 'vitest';

import { matrixMinMaxZ } from '../matrixMinMaxZ';

test('basic', () => {
  const matrix = [
    [10, 3, 2, 2],
    [2, 2, 1, -3],
    [3, 1, 3, 15],
  ];
  const result = matrixMinMaxZ(matrix);

  expect(result).toStrictEqual({ min: -3, max: 15 });
});

test('zero', () => {
  expect(() => {
    matrixMinMaxZ([[]]);
  }).toThrow('matrix must contain data');
});
