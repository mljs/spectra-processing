import { matrixZRescale } from '../matrixZRescale';

test('default options', () => {
  const data = [
    [1, 3, 2, 2],
    [2, 2, 1, 3],
    [3, 1, 3, 1],
  ];
  let result = matrixZRescale(data);

  result = result.map((row) => Array.from(row));
  expect(result).toStrictEqual([
    [0, 1, 0.5, 0.5],
    [0.5, 0.5, 0, 1],
    [1, 0, 1, 0],
  ]);
});

test('min: -2, max: 3', () => {
  const data = [
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0, 1, 2, 3],
  ];
  let result = matrixZRescale(data, { min: -3, max: 3 });

  result = result.map((row) => Array.from(row));
  expect(result).toStrictEqual([
    [-3, -1, 1, 3],
    [-3, -1, 1, 3],
    [-3, -1, 1, 3],
  ]);
});
