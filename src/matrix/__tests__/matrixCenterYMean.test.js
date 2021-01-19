import { matrixCenterYMean } from '../matrixCenterYMean';

test('matrixCenterYMean', () => {
  const data = [
    [1, 2, 3],
    [2, 1, 2],
    [3, 3, 1],
  ];
  let result = matrixCenterYMean(data);

  result = result.map((row) => Array.from(row));
  expect(result).toStrictEqual([
    [-1, 0, 1],
    [0, -1, 0],
    [1, 1, -1],
  ]);
});
