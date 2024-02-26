import { matrixCenterZMean } from '../matrixCenterZMean';

test('matrixCenterZMean', () => {
  const data = [
    [1, 3, 2, 2],
    [2, 2, 1, 3],
    [3, 1, 3, 1],
  ];
  const result = matrixCenterZMean(data);
  expect(result).toStrictEqual([
    Float64Array.from([-1, 1, 0, 0]),
    Float64Array.from([0, 0, -1, 1]),
    Float64Array.from([1, -1, 1, -1]),
  ]);
});
