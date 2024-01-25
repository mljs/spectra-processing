import { matrixSetSubMatrix } from '../matrixSetSubMatrix';

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
});
