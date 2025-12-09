import { expect, test } from 'vitest';

import { matrixSetSubMatrix } from '../matrixSetSubMatrix.ts';

test('simple case', () => {
  const matrix = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [2, 3, 4, 5, 6],
    [3, 4, 5, 6, 7],
  ];

  const subMatrix = [
    [0, 0],
    [0, 0],
  ];

  matrixSetSubMatrix(matrix, subMatrix, 2, 3);

  expect(matrix).toStrictEqual([
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [2, 3, 4, 0, 0],
    [3, 4, 5, 0, 0],
  ]);

  expect(() => matrixSetSubMatrix(matrix, subMatrix, 2, 4)).toThrowError(
    'submatrix indices are out of range',
  );

  expect(() =>
    matrixSetSubMatrix(matrix, subMatrix.concat([0, 0]), 2, 3),
  ).toThrowError('submatrix indices are out of range');
});
